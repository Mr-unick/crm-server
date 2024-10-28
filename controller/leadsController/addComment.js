const { LogContextImpl } = require("twilio/lib/rest/serverless/v1/service/environment/log");
const cloudinary = require("../../db/cloudnary");
const { Leads } = require("../../db/leadSchema");
const streamifier = require('streamifier'); // For converting buffer to stream

const AddComment = async (req, res) => {
  try {
    const { comment, collaborator } = req.body;
    const { image, pdf } = req.files || {}; // Assuming you use a middleware like multer to handle files
    const { id } = req.params;

    let imageUrl = null;
    let pdfUrl = null;

    // Upload image if provided
    if (image) {
      const stream = streamifier.createReadStream(image[0].buffer);
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });
      imageUrl = result.secure_url;
    }

    // Upload PDF if provided
    if (pdf) {
      const stream2 = streamifier.createReadStream(pdf[0].buffer);
      const result2 = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads', resource_type: 'raw' }, // Use 'raw' for PDFs
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream2.pipe(uploadStream);
      });
      pdfUrl = result2.secure_url;
    }

    // Find the lead by ID
    const lead = await Leads.findById(id);
     await Leads.findByIdAndUpdate(id, { status: 'active' }, { new: true, runValidators: true });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Add the new comment and files to the lead
    lead.comments.push({
      comment,
      imageUrl,
      pdfUrl,
      collaborator,
    });

    await lead.save();
    res.status(200).json({ message: "Comment Added", status: 200 });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { AddComment };

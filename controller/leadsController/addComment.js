

const { LogContextImpl } = require("twilio/lib/rest/serverless/v1/service/environment/log");
const cloudinary = require("../../db/cloudnary");
const { Leads } = require("../../db/leadSchema");
const fs = require("fs");
const path = require("path");
const streamifier = require('streamifier'); // For converting buffer to stream

const AddComment = async (req, res) => {

  
  try {
    const { comment, collaborator } = req.body;
    // const { image, pdf } = req.files;
     let image = null;
    let pdf = null;

    const { id } = req.params ;
  
    let imageUrl = "none";
    let pdfUrl = "none";
  
    let imageUrl = "none";
    let pdfUrl = "none";

    // Upload image if provided
    // if (image) {
    //   const stream = streamifier.createReadStream(image[0].buffer);

    //   await cloudinary.uploader.upload(image[0], (error, imageResult) => {
    //     if (error) {
    //       console.error("Error uploading image:", error);
    //       return res.status(500).send({ message: "Error uploading image" });
    //     }
    //     imageUrl = imageResult.secure_url;
     

    //   });
    // }
   if(image){
    const stream = streamifier.createReadStream(image[0].buffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', resource_type: 'image' }, // Adjust folder name and resource_type if needed
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });
    
 imageUrl = result.secure_url;
   }

 if(pdf){
  const stream2 = streamifier.createReadStream(pdf[0].buffer);

    const result2 = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', resource_type: 'image' }, // Adjust folder name and resource_type if needed
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream2.pipe(uploadStream);
    });
    
 pdfUrlUrl = result2.secure_url;
 }

    // Upload PDF if provided
    // if (pdf) {
    //   await cloudinary.uploader.upload(pdf[0], (error, pdfResult) => {
    //     if (error) {
    //       console.error("Error uploading pdf:", error);
    //       return res.status(500).send({ message: "Error uploading pdf" });
    //     }
    //     pdfUrl = pdfResult.secure_url;
      
    //   });
    // }

    // Find the lead by ID
    let lead = await Leads.findById(id);

    console.log( imageUrl,id);
    // Add the new comment and files to the lead
    lead.comments.push({
      comment: comment,
      imageUrl: imageUrl,
      pdfUrl: pdfUrl,
      collaborator: collaborator,
    });

    await lead.save();

    res.status(200).json({ message: "Comment Added", status: 200 });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { AddComment };

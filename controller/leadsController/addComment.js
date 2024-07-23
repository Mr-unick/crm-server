

const { LogContextImpl } = require("twilio/lib/rest/serverless/v1/service/environment/log");
const cloudinary = require("../../db/cloudnary");
const { Leads } = require("../../db/leadSchema");
const fs = require("fs");
const path = require("path");

const AddComment = async (req, res) => {
  
  try {
    const { comment, collaborator } = req.body;
    const { image, pdf } = req.files;
    const { id } = req.params;
  
    let imageUrl = "none";
    let pdfUrl = "none";

  
    
    // Upload image if provided
    if (image) {
      await cloudinary.uploader.upload(image[0].path, (error, imageResult) => {
        if (error) {
          console.error("Error uploading image:", error);
          return res.status(500).send({ message: "Error uploading image" });
        }
        imageUrl = imageResult.secure_url;
     
        fs.unlink(image[0].path, (error) => {
          if (error) {
            console.error("Error deleting image:", error);
            return res.status(500).json({ message: "Error deleting image" });
          }
        
        });

      });
    }

    

    // Upload PDF if provided
    if (pdf) {
      await cloudinary.uploader.upload(pdf[0].path, (error, pdfResult) => {
        if (error) {
          console.error("Error uploading pdf:", error);
          return res.status(500).send({ message: "Error uploading pdf" });
        }
        pdfUrl = pdfResult.secure_url;
       
        fs.unlink(pdf[0].path, (error) => {
          if (error) {
            console.error("Error deleting image:", error);
            return res.status(500).json({ message: "Error deleting image" });
          }
        });
      });
    }

    // Find the lead by ID
    let lead = await Leads.findById(id);

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
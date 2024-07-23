const mongoose = require("mongoose");
require("dotenv").config();
// Replace the following with your MongoDB connection string

  

const connectDB = async () => {
  console.log('call');
  try {
    
    await mongoose.connect(process.env.DBURL);
    console.log("MongoDB connected yaaar successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    
  }
};

module.exports = connectDB;


const mongoose = require("mongoose");

 const collaboratorSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   dateTimeAdded: { type: Date, default: Date.now },
   level: {
     type: String,
     enum: ["Sales Professional", "Interior Designer", "Operation Manager"],
   },
 });


const Collaborators = mongoose.model("Collaborators",collaboratorSchema);

module.exports = { Collaborators, collaboratorSchema };
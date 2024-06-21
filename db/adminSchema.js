const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateTimeAdded: { type: Date, default: Date.now },
  level: {
    type: String,
   default:'admin'
  },
});

const Admins = mongoose.model("Admins", AdminSchema);

module.exports = { Admins, AdminSchema };

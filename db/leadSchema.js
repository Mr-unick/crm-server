const mongoose = require("mongoose");
const { collaboratorSchema } = require("./colabratorSchema");


const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  imageUrl: { type: String },
  pdfUrl: { type: String },
  collaborator: { type: Object },
  dateTimeAdded: { type: Date, default: Date.now },
});

const leadSchema = new mongoose.Schema({
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  priority: {
    type: String,
    enum: ["high", "low", "medium"],
    default: "medium",
  },
  comments: { type: [commentSchema], default: [] }, // Default to an empty array
  stage: {
    type: String,
    enum: ["prospect", "qualified", "opportunity", "nurture", "re-prospect"],
    default: "prospect",
  },
  collaborators: { type: [collaboratorSchema], default: [] }, // Default to an empty array
  Headcollaborator: { type: collaboratorSchema, default: null }, // Default to null or undefined
  leadReminder: { type: Date },
  address: { type: String },
  source: {
    type: String,
    enum: ["Ads", "Website form", "Inbound Call", "Client Referral", "Manual","Walk In","none"],
    default: "manual",
  },
  adSource: {
    adCampaignName: { type: String },
  },
  phone: { type: String, default: "none" },
  secondaryNumber: { type: String, default: "none" },
  branchCode: { type: String, default: "LC32" },
  dateTimeAdded: { type: Date, default: Date.now },
  name: { type: String },
  email: { type: String },
  requirement:{ type: String },
});

const Leads = mongoose.model("Leads", leadSchema);

module.exports = { Leads,commentSchema};

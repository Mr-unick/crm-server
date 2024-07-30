const { default: mongoose } = require("mongoose");
const connectDB = require("../../db/connection");
const { Leads } = require("../../db/leadSchema");


const dummyData = [
  {
    status: "active",
    priority: "high",
    comments: [
      {
        comment: "First comment",
        imageUrl: "http://example.com/image1.png",
        pdfUrl: "http://example.com/doc1.pdf",
        collaborator: { name: "John Doe", role: "Manager" },
      },
      {
        comment: "Second comment",
        imageUrl: "http://example.com/image2.png",
        pdfUrl: "http://example.com/doc2.pdf",
        collaborator: { name: "Jane Smith", role: "Developer" },
      },
    ],
    stage: "prospect",
    collaborators: [
      { name: "Alice", role: "Sales" },
      { name: "Bob", role: "Support" },
    ],
    Headcollaborator: { name: "Charlie", role: "Head of Sales" },
    leadReminder: new Date('2024-12-31T23:59:59'),
    address: "123 Main St, City, Country",
    source: "Ads",
    adSource: {
      adCampaignName: "Winter Sale Campaign",
    },
    phone: "123-456-7890",
    secondaryNumber: "098-765-4321",
    branchCode: "b2",
    dateTimeAdded: new Date(),
    name: "John Lead",
    email: "john@example.com",
  },
  {
    status: "inactive",
    priority: "medium",
    comments: [
      {
        comment: "Third comment",
        imageUrl: "http://example.com/image3.png",
        pdfUrl: "http://example.com/doc3.pdf",
        collaborator: { name: "Daisy", role: "Consultant" },
      },
    ],
    stage: "nurture",
    collaborators: [
      { name: "Eve", role: "Sales" },
      { name: "Frank", role: "Support" },
    ],
    Headcollaborator: { name: "Grace", role: "Head of Marketing" },
    leadReminder: new Date('2024-11-30T23:59:59'),
    address: "456 Secondary St, City, Country",
    source: "Website form",
    adSource: {
      adCampaignName: "Spring Promotion",
    },
    phone: "222-333-4444",
    secondaryNumber: "333-444-5555",
    branchCode: "b3",
    dateTimeAdded: new Date(),
    name: "Jane Lead",
    email: "jane@example.com",
  },
];

// wzidoaF9Q7TsuzLR
const AddLead = async (req, res) => {

   const data = req.body;

   try {
     
    await Leads.insertMany(data);
    res.status(200).send({status:200});
   } catch (e) {
     console.error(e); // Log the error for debugging purposes
     res.status(500).send({
       message: "Failed to add lead",
       error: e.message, // Provide more context about the error
     });
   }
};

module.exports = { AddLead};

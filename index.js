const express = require("express");
const { GetLeads } = require("./controller/leadsController/getLeads");
const { AddLead } = require("./controller/leadsController/addLead");
const { DeleteLead } = require("./controller/leadsController/deleteLead");
const { UpdateLead } = require("./controller/leadsController/updateLead");
const connectDB = require("./db/connection");
const AddCollabrator = require("./controller/collabatorController/addCollabrator");
const SignInCollabrator = require("./controller/collabatorController/signinCollabrator");
const { GetCollabrators } = require("./controller/collabatorController/getCollabrators");
const { DeleteCollabrator } = require("./controller/collabatorController/deleteCollabrator");
const { UpdateCollabrator } = require("./controller/collabatorController/updateCollabrator");
const { WhatsappMessage } = require("./controller/integration/whatsapp");
const { SendMail } = require("./controller/integration/sendmail");
const cors = require("cors");
const verifyToken = require("./middlewares/TokenVerification");
const AddAdmin = require("./controller/admin/addadmin");
const SignInAdmin = require("./controller/admin/adminSigin");
const { GetAssignedLeads } = require("./controller/leadsController/getassignedleads");
const multer = require("multer");
const { AddComment } = require("./controller/leadsController/addComment");
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require("body-parser");
const path = require("path");
const { Wpmessage } = require("./controller/integration/whatsapp2");
const { GetLeadsWithTodayRemainder } = require("./controller/leadsController/getRemainderLeads");

connectDB();

const app = express();
const port = 4000;
const httpsPort = 443;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Default route
app.get("/", (req, res) => {
  res.send("Hello, updated World!");
});

// Leads APIs
app.get("/leads/allleads", verifyToken, GetLeads);
app.get("/leads/remainderleads/:collaboratorId", verifyToken, GetLeadsWithTodayRemainder);
app.get("/leads/:collaboratorId", verifyToken, GetAssignedLeads);
app.post("/leads/addleads", verifyToken, AddLead);
app.delete("/leads/delete/:id", verifyToken, DeleteLead);
app.post("/leads/update/:id", verifyToken, UpdateLead);
app.post("/leads/addcoment/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), AddComment);

// Collaborator APIs
app.post("/collabrators/addcollabrator", verifyToken, AddCollabrator);
app.post("/collabrators/signin", SignInCollabrator);
app.get("/collabrators/getcollabrators", verifyToken, GetCollabrators);
app.delete("/collabrators/delete/:id", verifyToken, DeleteCollabrator);
app.post("/collabrators/update/:id", verifyToken, UpdateCollabrator);

// Admin APIs
// app.post("/admin/addadmin", AddAdmin);  // Disabled for security
app.post("/admin/signin", SignInAdmin);

// WhatsApp Integration API
app.post('/sendmessage', Wpmessage);

// Setup SSL for HTTPS (ensure you have the correct file paths for key and cert)

// Create HTTP server
http.createServer(app).listen(port, () => {
 console.log(`HTTP server is running on http://localhost:${port}`);
});

// Create HTTPS server
https.createServer( app).listen(80, () => {
  console.log(`HTTPS server is running on https://localhost:${4000000}`);
});

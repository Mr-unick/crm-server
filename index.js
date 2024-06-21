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
const cors=require('cors');
const verifyToken = require("./middlewares/TokenVerification");
const AddAdmin = require("./controller/admin/addadmin");
const SignInAdmin = require("./controller/admin/adminSigin");
const { GetAssignedLeads } = require("./controller/leadsController/getassignedleads");
const multer = require("multer");
const { AddComment } = require("./controller/leadsController/addComment");


connectDB()



const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const path = require("path");
const { Wpmessage } = require("./controller/integration/whatsapp2");

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads")); // Ensure path.join() returns a string
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name or generate a unique name
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});




app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// leads Apis
app.get("/leads/allleads", verifyToken, GetLeads);
app.get("/leads/:collaboratorId", verifyToken,GetAssignedLeads);
app.post("/leads/addleads", verifyToken, AddLead);
app.delete("/leads/delete/:id", verifyToken, DeleteLead);
app.post("/leads/update/:id",verifyToken, UpdateLead);

app.post("/leads/addcoment/:id",upload.fields([{ name: 'image', maxCount: 1 },{ name: 'pdf', maxCount: 1 },],), AddComment)

// collabrator Apis
app.post("/collabrators/addcollabrator", verifyToken, AddCollabrator);
app.post("/collabrators/signin", SignInCollabrator);
app.get("/collabrators/getcollabrators", verifyToken, GetCollabrators);
app.delete("/collabrators/delete/:id", verifyToken, DeleteCollabrator);
app.post("/collabrators/update/:id", verifyToken, UpdateCollabrator);

// Admin Apis 

// app.post("/admin/addadmin", AddAdmin);  // to add admin commented for security purpose
app.post("/admin/signin", SignInAdmin);

// whatsapp integratio Apis
app.post('/sendmessage',Wpmessage)

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const Leads = require("../../db/leadSchema");


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

module.exports = { AddLead };

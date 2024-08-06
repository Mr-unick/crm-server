
const { Leads } = require("../../db/leadSchema");
const { SendMail } = require("../integration/sendmail");

const UpdateLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const updatedData = req.body;


    // Update the lead with the new data
    await Leads.findByIdAndUpdate(leadId, {...updatedData});

console.log(updatedData,'data');

    res.status(200).send({status:200});
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { UpdateLead };

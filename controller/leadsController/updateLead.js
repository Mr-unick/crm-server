
const { Leads } = require("../../db/leadSchema");
const { SendMail } = require("../integration/sendmail");

const UpdateLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const updatedData = req.body;
 let headCollaborator = null;
    // Fetch the old lead data
    const oldLead = await Leads.findById(leadId);

    // Check if the stage is changing
    if (oldLead.stage !== updatedData.stage) {
     

      // Determine the head collaborator based on the new stage
      if (
        updatedData.stage === "prospect" ||
        updatedData.stage === "opportunity"
      ) {
        headCollaborator = oldLead.collaborators.find(
          (collaborator) => collaborator.level === "Sales Professional"
        );
      } else if (
        updatedData.stage === "qualified" ||
        updatedData.stage === "nurture"
      ) {
        headCollaborator = oldLead.collaborators.find(
          (collaborator) => collaborator.level === "Interior Designer"
        );
      } else if (updatedData.stage === "re-prospect") {
        headCollaborator = oldLead.collaborators.find(
          (collaborator) => collaborator.level === "Operation Manager"
        );
      }

      // Send email to old lead's email address
      SendMail(oldLead.email);
    }

    // Update the lead with the new data
    const updatedLead = await Leads.findByIdAndUpdate(leadId, {
      ...updatedData,
      Headcollaborator: headCollaborator,
    });


    res.status(200).send({status:200});
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { UpdateLead };

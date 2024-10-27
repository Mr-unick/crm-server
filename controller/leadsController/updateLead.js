const { collaboratorSchema, Collaborators } = require("../../db/colabratorSchema");
const { Leads } = require("../../db/leadSchema");
const { SendMail } = require("../integration/sendmail");

const UpdateLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const updatedData = req.body;

  

    // Check for collaborator updates
    if (updatedData.collaborators || updatedData.Headcollaborator || updatedData.deletecollaborator) {

      const lead = await Leads.findById(leadId);

      // Handle collaborator addition (if collaborator provided)
      if (updatedData.collaborators) {

        const collaborator = await Collaborators.findById(updatedData.collaborators);

        // Check for existing collaborator (avoid duplicates)
        const existingCollaborator = lead.collaborators.find((collab) => collab._id.toString() === collaborator._id.toString());
        console.log('stage 2');

        if (!existingCollaborator) {
          await Leads.findByIdAndUpdate(
            leadId,
            { $push: { collaborators: collaborator } },
            { new: true, useFindAndModify: false }
          );
       
        } 
      }

      // Handle Head Collaborator update
      if (updatedData.Headcollaborator) {

        const newHeadCollaborator = await Collaborators.findById(updatedData.Headcollaborator);

        await Leads.findByIdAndUpdate(leadId, { Headcollaborator: newHeadCollaborator });

        const collaborator = await Collaborators.findById(updatedData.Headcollaborator);
    
     
          await Leads.findByIdAndUpdate(
            leadId,
            { $push: { collaborators: collaborator } },
            { new: true, useFindAndModify: false }
          );

          


      }

      // Handle collaborator deletion
      if (updatedData.deletecollaborator) {
        await Leads.findByIdAndUpdate(
          leadId,
          { $pull: { collaborators: { _id: updatedData.deletecollaborator } } },
          { new: true, useFindAndModify: false }
        );
      }
    }

    // Update other lead fields (excluding collaborators)
    delete updatedData.collaborators; // Prevent collaborator updates in this step
    delete updatedData.Headcollaborator;
    delete updatedData.deletecollaborator;

     await Leads.findByIdAndUpdate(leadId, updatedData, { new: true });

    // Send email notification (optional based on your requirements)
    // await SendMail(updatedLead); // Uncomment if needed


    const updatedLead =await Leads.findById(leadId);

    res.status(200).send({ status: 200, lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { UpdateLead };
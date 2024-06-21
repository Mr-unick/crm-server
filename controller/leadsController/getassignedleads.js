const Leads = require("../../db/leadSchema");

const GetAssignedLeads = async (req, res) => {
  try {

    const collaboratorId =
      req.params.collaboratorId 

    if (!collaboratorId) {
      return res.status(400).send({ error: "Collaborator ID is required" });
    }
    const data = await Leads.find({
      collaborators: { $elemMatch: { id: collaboratorId } },
    });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};


module.exports = { GetAssignedLeads };

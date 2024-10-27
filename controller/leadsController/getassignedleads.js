const { Leads } = require("../../db/leadSchema");


const GetAssignedLeads = async (req, res) => {
  try {

    const collaboratorId =req.params.collaboratorId 
    const leads = await Leads.find({
      $or: [
        { collaborators: { $elemMatch: { _id: collaboratorId } } },
        { Headcollaborator: {_id:collaboratorId} } 
      ]
    });

// console.log(leads);

    res.status(200).send(leads);
  } catch (e) {
    res.status(500).send(e);
  }
};


module.exports = { GetAssignedLeads };

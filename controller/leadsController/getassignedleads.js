const { Leads } = require("../../db/leadSchema");


const GetAssignedLeads = async (req, res) => {
  try {

    const collaboratorId =req.params.collaboratorId 
    
    const data = await Leads.find({
      collaborators: { $elemMatch: { _id: collaboratorId } },
    });

    console.log(data,'hello data');
    

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};


module.exports = { GetAssignedLeads };

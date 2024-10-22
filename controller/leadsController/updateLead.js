
const { collaboratorSchema, Collaborators } = require("../../db/colabratorSchema");
const { Leads } = require("../../db/leadSchema");
const { SendMail } = require("../integration/sendmail");

const UpdateLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const updatedData = req.body;
    let newlead;

    let collabrator;
  if(req.body.collaborators){

    collabrator =await Collaborators.findById(updatedData.collaborators)

    await Leads.findByIdAndUpdate(
      leadId,
      { $push: { collaborators: collabrator } },
      { new: true, useFindAndModify: false }
    );

}else if(req.body.Headcollaborator){

  let newHeadcollabrator =await Collaborators.findById(updatedData.Headcollaborator)

  await Leads.findByIdAndUpdate(
    leadId,{Headcollaborator:newHeadcollabrator}

  );
}else if(req.body.deletecollaborator){
  await Leads.findByIdAndUpdate(
    leadId,
    { $pull: { collaborators: { _id: req.body.deletecollaborator } } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).send({status:200,msg:req.body.deletecollaborator});
  
  
}

 let UpdateLead= await Leads.findByIdAndUpdate(
    leadId,
    {...updatedData}
  );

    // Update the lead with the new data

      let newleadtosend = await Leads.findById(leadId);

    // Update the lead with the new data

    res.status(200).send({status:200,lead:newleadtosend});
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { UpdateLead };

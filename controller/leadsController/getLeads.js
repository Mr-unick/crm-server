const { Leads } = require("../../db/leadSchema");
const { getFacebookLeads } = require("../integration/facebookleads");
const { CheckInactiveLeads } = require("./checkInActiveLead");



const GetLeads = async (req, res) => {

  const {isadmin,id}=req.query;

console.log(isadmin,id);

  try {
   
    if(isadmin){
    getFacebookLeads()
    CheckInactiveLeads()
    const leads = await Leads.find().sort({ dateTimeAdded: -1 });

    res.status(200).send(leads);
    }else{
    const leads = await Leads.find({
      collaborators: {
        $elemMatch: { _id: id },
      },
    }).sort({ dateTimeAdded: -1 });
  
    res.status(200).send(leads);}
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { GetLeads };

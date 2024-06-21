const { Leads } = require("../../db/leadSchema");



const GetLeads = async (req, res) => {

  const {isadmin,id}=req.query;

console.log(isadmin,id);

  try {
   
    if(isadmin){
      console.log(false);
    const leads = await Leads.find();
    res.status(200).send(leads);
    }else{
    const leads = await Leads.find({
      collaborators: {
        $elemMatch: { _id: id },
      },
    });
  
    res.status(200).send(leads);}
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { GetLeads };

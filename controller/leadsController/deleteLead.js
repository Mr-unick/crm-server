const Leads = require("../../db/leadSchema");

const DeleteLead = async (req, res) => {

  try {
    const data = await Leads.findByIdAndDelete(req.params.id);
    res.status(200).send(`${req.params.id} deleted`);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { DeleteLead };

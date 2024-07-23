const { Collaborators } = require("../../db/colabratorSchema");


const DeleteCollabrator = async (req, res) => {
  try {
    const data = await Collaborators.findByIdAndDelete(req.params.id);
    res.status(200).send({status:200});
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { DeleteCollabrator };

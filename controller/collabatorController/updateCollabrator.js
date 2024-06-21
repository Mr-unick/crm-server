const { Collaborators } = require("../../db/colabratorSchema");


const UpdateCollabrator = async (req, res) => {
  try {
    const data = await Collaborators.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(` data updated for id ${req.params.id}`);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { UpdateCollabrator };

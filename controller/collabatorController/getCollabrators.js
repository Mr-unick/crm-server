const { Collaborators } = require("../../db/colabratorSchema");


const GetCollabrators = async (req, res) => {
  try {
    const data = await Collaborators.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { GetCollabrators };

const { Leads } = require("../../db/leadSchema");

const GetLeadsWithTodayRemainder = async (req, res) => {
  try {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const { isadmin } = req.query;

    const collaboratorId = req.params.collaboratorId

    let data;
    if (isadmin) {
      data = await Leads.find({
        leadReminder: formattedToday,
      });
    } else {
      data = await Leads.find({
        collaborators: { $elemMatch: { _id: collaboratorId } },
        leadReminder: formattedToday,
      });
    }



    console.log(data, 'Leads with today\'s remainder');

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { GetLeadsWithTodayRemainder }
const { Leads } = require("../../db/leadSchema");

const CheckInactiveLeads = async () => {
  try {
    // Get the current date and time
    const currentTime = new Date();

    // Calculate the cutoff time (72 hours ago)
    const cutoffTime = new Date(currentTime.getTime() - 72 * 60 * 60 * 1000); // 72 hours in milliseconds

    // Find all leads that are older than 72 hours
    const leads = await Leads.find({
      dateTimeAdded: { $lt: cutoffTime } // Only consider leads older than 72 hours
    });

    // Loop through each lead and check for comments
    for (const lead of leads) {
      // Check if the comments array is empty
      if (lead.comments.length === 0) {
        // If there are no comments, mark the lead as inactive
        await Leads.findByIdAndUpdate(lead._id, { status: 'inactive' });
      } else {
        // Get the last comment's dateTimeAdded
        const lastCommentDate = lead.comments[lead.comments.length - 1].dateTimeAdded;

        // If the last comment is older than 72 hours, mark the lead as inactive
        if (lastCommentDate < cutoffTime) {
          await Leads.findByIdAndUpdate(lead._id, { status: 'inactive' });
        }
      }
    }

    console.log("Inactive leads have been updated.");
  } catch (error) {
    console.error("Error updating inactive leads:", error);
  }
};

module.exports = { CheckInactiveLeads };

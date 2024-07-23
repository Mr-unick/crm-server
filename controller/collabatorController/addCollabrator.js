const bcrypt = require("bcrypt");
const { Collaborators } = require("../../db/colabratorSchema");
 

const AddCollabrator = async (req, res) => {
  const { email,name,password, level } = req.body;

  try {
    // Check if the user already exists
    const existingCollaborator = await Collaborators.findOne({ email });
    if (existingCollaborator) {
      return res.status(400).send({
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new collaborator
    const newCollaborator = new Collaborators({
      name,
      email,
      password: hashedPassword,
      level,
      dateTimeAdded: new Date(),
    });

    await newCollaborator.save();
    res.status(200).send({status:200});
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).send({
      message: "Failed to add collaborator",
      error: e.message, // Provide more context about the error
    });
  }
};

module.exports = AddCollabrator;

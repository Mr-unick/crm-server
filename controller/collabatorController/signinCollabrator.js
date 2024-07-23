const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Collaborators } = require("../../db/colabratorSchema");
require("dotenv").config();



const SignInCollabrator = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const collaborator = await Collaborators.findOne({ email });
    if (!collaborator) {
      return res.status(400).send({
        message: "User Not Found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, collaborator.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid  password",
      });
    }

    // Optionally, generate a JWT token for authentication
    const token = jwt.sign(
      {
        id: collaborator._id,
        email: collaborator.email,
        level: collaborator.level,
      },
    process.env.JWT_SECRET, //  secret key
      { expiresIn: "1h" }
    );

    res.status(200).send({
      status: 200,
      message: "Sign in successful",
      token: token,
      name: collaborator.name,
      email: collaborator.email,
      level: collaborator.level, // Send the token to the client
    });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).send({
      message: "Failed to sign in",
      error: e.message, // Provide more context about the error
    });
  }
};

module.exports = SignInCollabrator;

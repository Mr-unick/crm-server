const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admins } = require("../../db/adminSchema");
require("dotenv").config();

const SignInAdmin = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const admin = await Admins.findOne({ email });
    if (!admin) {
      return res.status(400).send({
        message: "User Not Found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid  password",
      });
    }

    // Optionally, generate a JWT token for authentication
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        level: admin.level,
      },
      process.env.JWT_SECRET, //  secret key
      { expiresIn: "24h" }
    );

    res.status(200).send({
      status: 200,
      message: "Sign in successful",
      token: token,
      name:admin.name ,
      email:admin.email,
      level:admin.level
    });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).send({
      message: "Failed to sign in",
      error: e.message, // Provide more context about the error
    });
  }
};

module.exports = SignInAdmin;

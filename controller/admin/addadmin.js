const bcrypt = require("bcrypt");
const { Admins } = require("../../db/adminSchema");


const AddAdmin = async (req, res) => {

  const { email, name, password } = req.body;

  try {
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new collaborator
    const newAdmin = new Admins({
      name,
      email,
      password: hashedPassword,
      dateTimeAdded: new Date(),
    });

    await newAdmin.save();
    res.status(200).send({ status: 200 });
  } catch (e) {
    console.error(e); 
    res.status(500).send({
      message: "Failed to add Admin",
      error: e.message, 
    });
  }
};

module.exports = AddAdmin;

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the token using an arrow function
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied. No token provided.");
console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

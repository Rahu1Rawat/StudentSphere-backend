const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
}
console.log(process.env.JWT_SECRET_KEY);
module.exports = { generateToken };

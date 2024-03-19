const express = require("express");
const app = express();
const cors = require("cors");
const { University } = require("../database/dbUniConnect");
const { Email } = require("../database/dbEmailConnect");
const main = require("./sendEmail");
const { SignUpDetails } = require("../database/SignUpDetailsDB");
const dbSignUpDetailsConnect = require("../database/dbSignUpDetailsConnect");

dbSignUpDetailsConnect();

app.use(cors());
app.use(express.json());

let OTPs = {};

app.post("/check-domain", async (req, res) => {
  const email = req.body.domain;
  const getDomain = email.split("@")[1];

  const resultEmail = await Email.findOne({ domain: getDomain });

  if (resultEmail) {
    return res.json({ status: "Limited" });
  } else {
    const domainQuery = {
      domains: { $in: [getDomain] },
    };

    const resultUni = await University.find(domainQuery);

    if (resultUni.length > 0) {
      return res.json({ status: "Full" });
    } else {
      return res.json({ Status: "None" });
    }
  }
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const { OTP } = await main(email); // Get the OTP from the returned object
    OTPs[email] = OTP; // Store the OTP
    res.json({ message: "OTP sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (OTPs[email] === otp) {
    res.json({
      message: "OTP verified",
    });
  } else {
    res.json(400).json({ message: "Invalid OTP" });
  }
});

app.post("/create-account", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ message: "Email, password and username are required" });
      return;
    }
    const existingUser = await SignUpDetails.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }
    const newUser = new SignUpDetails({ email, password, username });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the account" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    const user = await SignUpDetails.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    if (user.password !== password) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

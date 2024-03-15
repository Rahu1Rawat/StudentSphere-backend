require("dotenv").config();
const nodemailer = require("nodemailer");

function generateOTP() {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function main(userEmail) {
  let OTP = generateOTP();
  const info = await transporter.sendMail({
    from: `"TEAM Student-Sphere" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: "Please verify your email to use Student Sphere  ",
    text: `Enter this verification code in the window where you began signing up for your account: ${OTP}`,
    html: `<b>Enter this verification code in the window where you began signing up for your account: </b> <br> ${OTP}`,
  });

  console.log("message sent: %s", info.messageId);
  return { info, OTP };
}

module.exports = main;

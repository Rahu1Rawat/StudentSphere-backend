const mongoose = require("mongoose");

async function dbSignUpDetailsConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://rahul:fVWVHWTsV4qEIbA4@cluster0.mymg5ul.mongodb.net/Student-Sphere"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

module.exports = dbSignUpDetailsConnect;

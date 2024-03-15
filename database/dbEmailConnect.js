const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");
const path = require("path");

mongoose.connect(
  "mongodb+srv://rahul:fVWVHWTsV4qEIbA4@cluster0.mymg5ul.mongodb.net/Student-Sphere"
);

const emailSchema = new Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = {
  Email,
};

const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");
const path = require("path");
mongoose.connect(
  "mongodb+srv://rahul:fVWVHWTsV4qEIbA4@cluster0.mymg5ul.mongodb.net/Student-Sphere"
);

const universitySchema = new Schema({
  web_pages: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  alpha_two_code: {
    type: String,
    required: true,
  },
  state_province: {
    type: String,
  },
  domains: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const University = mongoose.model("University", universitySchema); // model banaya for use

module.exports = {
  University,
};
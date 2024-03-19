const mongoose = require("mongoose");
const { Schema } = mongoose;

const SignUpDetailsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const SignUpDetails = mongoose.model("SignUpDetails", SignUpDetailsSchema);

module.exports = {
  SignUpDetails,
};

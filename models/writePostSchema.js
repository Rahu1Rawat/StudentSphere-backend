const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(
  "mongodb+srv://rahul:fVWVHWTsV4qEIbA4@cluster0.mymg5ul.mongodb.net/Student-Sphere"
);

const writePostSchema = new Schema({
  topic: {
    type: String,
  },
  time:{
    type:String
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  university: {
    type: String,
  },
  username: {
    type: String,
  },
});

const WrittenPosts = mongoose.model("WrittenPosts", writePostSchema);

module.exports = { WrittenPosts };

const mongoose1 = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = new mongoose1.Schema({
  
  CourseName: {
    type: String,
  },
  CourseCode: {
    type: String,
  },
  Question: {
    type: String,
  },
  Answer: {
    type: String,
  },
  imp: {
    type: String,
  },
});

const User = mongoose1.model("All-Questions", schema);

module.exports = User;

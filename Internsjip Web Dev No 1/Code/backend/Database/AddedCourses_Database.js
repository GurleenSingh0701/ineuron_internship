const mongoose = require("mongoose");
const teacher = require("./Teacher_Database.js");
const schema = new mongoose.Schema({
  CourseName: {
    type: String,
  },
  CourseCode: {
    type: String,
  },
  CourseNo: {
    type: Number,
  },
  CourseDetails: {
    type: String,
  },
  CourseCreatedOn: {
    type: Date,
    default: Date.now(),
  },
  All_Questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "All-Questions",
    },
  ],
  All_Quizes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Quiz-Questions",
    },
  ],
});

const User = mongoose.model("newCourses", schema);

module.exports = User;

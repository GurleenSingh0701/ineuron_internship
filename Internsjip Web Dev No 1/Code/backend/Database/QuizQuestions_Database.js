const mongoose1 = require("mongoose");

const schema = new mongoose1.Schema({
  CourseName: {
    type: String,
  },
  CourseCode: {
    type: String,
  },
  QuizDetails: {
    type: String,
  },
  Quiz: [
    {
      arr1: {
        type: [String],
        default:[],
      },
      arr2: {
        type: [String],
        default:[],
      },
      arr3: {
        type: [String],
        default:[],
      },
      arr4: {
        type: [String],
        default:[],
      },
      arr5: {
        type: [String],
        default:[],
      },
      arr6: {
        type: [String],
        default:[],
      },
    },
  ],
});

const User = mongoose1.model("Quiz-Questions", schema);

module.exports = User;
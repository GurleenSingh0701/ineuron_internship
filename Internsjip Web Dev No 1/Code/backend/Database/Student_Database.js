const mongoose1 = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = new mongoose1.Schema({
  name: {
    type: String,
  },
  email_id: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  Courses: [
    {
      id: {
        type: String,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirm_password = await bcryptjs.hash(this.confirm_password, 12);
  }
  next();
});
schema.methods.generateAuthToken = async function () {
  try {
    console.log("hello world");
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
schema.methods.addCourses = async function (id) {
  try {
    console.log("hello world" + id);
    this.Courses = await this.Courses.concat({ id:  id });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose1.model("New_Student_details", schema);

module.exports = User;
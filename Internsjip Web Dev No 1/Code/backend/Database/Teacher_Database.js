const mongoose1 = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose1.Schema({
  adminId: {
    type: mongoose1.Schema.Types.ObjectId,
    ref: "newCourses",
  },
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
  CourseCreatedBy: [
    {
      type: mongoose1.Types.ObjectId,
      ref: "newCourses",
    },
  ],
  NewStudentDetails: [
    {
      type: mongoose1.Types.ObjectId,
      ref: "newAdminStudents",
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
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

schema.methods.generateRefreshAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose1.model("new_admins", schema);

module.exports = User;

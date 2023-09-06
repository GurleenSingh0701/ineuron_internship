const mongoose1 = require("mongoose");
const Schema = new mongoose1.Schema({
  firstName: String,
  lastName: String,
  email_address: String,
  Phone_No: Number,
  FatherName: String,
  MotherName: String,
  FatherMobileNo: Number,
  MotherMobileNo: Number,
  Address: String,
  Registration: Number,
  StudentClass: String,
  Gender: String,
  BirthDate: String,
});

const User = mongoose1.model("newAdminStudents", Schema);

module.exports = User;

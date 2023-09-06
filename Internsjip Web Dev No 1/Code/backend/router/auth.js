const express = require("express");
const bcryptjs = require("bcrypt");
const router = express.Router();
require("../db/conn");
const Admin_User = require("../Database/Teacher_Database");
const AddCourse = require("../Database/AddedCourses_Database");
const Questions = require("../Database/CourseQuestions_Database");
const QuizQuestions = require("../Database/QuizQuestions_Database");
const Student = require("../Database/Student_Database");
const Admin_AddedStudents = require("../Database/New_StudentByAdmins_Database");
const db = process.env.ATLAS_URI;

// All Post  Methods are available here ...

// Admin Register Route

router.post("/admin_register", async (req, res) => {
  const { name, email_id, phone_no, password, confirm_password } = req.body;
  if (!name || !email_id || !phone_no || !password || !confirm_password) {
    res.status(422).send();
  }
  try {
    const userExist = await User.findOne({ email_id: email_id });
    if (userExist) {
      res.status(403).send();
    } else {
      user = new Admin_User({
        name,
        email_id,
        phone_no,
        password,
        confirm_password,
      });

      user.save();
    }
  } catch (err) {
    console.log(err);
  }
});

// Admin Login Route

router.post("/admin_login", async (req, res) => {
  let token, refreshToken;
  try {
    const { email_id, password } = req.body;
    if (!email_id || !password) return res.status(422).send();
    const info = await Admin_User.findOne({ email_id: email_id });

    if (info) {
      const isMatch = bcryptjs.compare(password, info.password);
      token = await info.generateAuthToken();
      refreshToken = await info.generateRefreshAuthToken();

      if (isMatch) {
        res.cookie("jwt_token", token, {
          httpOnly: true,
          secure: true,
        });
        res.status(200).send();
      } else res.status(422).send();
    } else res.status(422).send();
  } catch (e) {
    console.log(e);
  }
});

// Student Register Route

router.post("/student_register", async (req, res) => {
  const { name, email_id, phone_no, password, confirm_password } = req.body;
  if (!name || !email_id || !phone_no || !password || !confirm_password) {
    res.status(422).send();
  }
  try {
    const userExist = await Student.findOne({ email_id: email_id });
    if (userExist) {
      res.status(403).send();
    } else {
      const user = new Student({
        name,
        email_id,
        phone_no,
        password,
        confirm_password,
      });
      await user.save();
      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
  }
});

// Student Login Route

router.post("/student_login", async (req, res) => {
  let token;
  try {
    const { email_id, password } = req.body;
    if (!email_id || !password) return res.status(422).send();
    const info = await Student.findOne({ email_id: email_id });
    if (info) {
      const isMatch = bcryptjs.compare(password, info.password);
      token = await info.generateAuthToken();
      if (isMatch) {
        res.cookie("jwt_token", token, {
          httpOnly: true,
          sameSite: true,
          secure: true,
        });
        res.status(200).send();
      } else res.status(422).send();
    } else res.status(422).send();
  } catch (e) {
    console.log(e);
  }
});

// route to add New Courses
router.post("/addCourse", async (req, res) => {
  try {
    const {
      CourseName,
      CourseCode,
      CourseNo,
      CourseDetails,
      CourseCreatedOn,
      email_id,
    } = req.body;
    if (!CourseName || !CourseCode || !CourseNo || !CourseDetails)
      res.status(403).send();
    const addedCourses = new AddCourse({
      CourseName,
      CourseCode,
      CourseNo,
      CourseDetails,
      CourseCreatedOn,
      email_id,
    });
    const info = Admin_User.findOne(
      { email_id: email_id },
      async (err, obj) => {
        const NewAdmin = new Admin_User(obj);
        NewAdmin.CourseCreatedBy.push(addedCourses);

        NewAdmin.save();
      }
    );

    await addedCourses.save();

    res.status(200).send();
    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
});

//rooute to add new Questions

router.post("/Questions", async (req, res) => {
  try {
    const { CourseName, CourseCode, Question, Answer, imp } = req.body;
    if (!CourseName || !CourseCode || !Question || !Answer)
      res.status(403).send();
    const user = new Questions({
      CourseName,
      CourseCode,
      Question,
      Answer,
      imp,
    });
    const info = AddCourse.findOne({ CourseName: CourseName }, (err, obj) => {
      console.log(obj);
      const NewQuestion = new AddCourse(obj);
      NewQuestion.All_Questions.push(user);
      NewQuestion.save();
    });
    await user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
});

// Route to add new Quiz Questions

router.post("/Quiz-Questions", async (req, res) => {
  try {
    const {
      CourseName,
      CourseCode,
      QuizDetails,
      arr1,
      arr2,
      arr3,
      arr4,
      arr5,
      arr6,
    } = req.body;
    if (
      !CourseName ||
      !CourseCode ||
      !QuizDetails ||
      arr1.includes("" || null) ||
      arr2.includes("" || null) ||
      arr3.includes("" || null) ||
      arr4.includes("" || null) ||
      arr5.includes("" || null) ||
      arr6.includes("" || null)
    )
      return res.status(403).send();

    const users = new QuizQuestions({
      CourseName,
      CourseCode,
      QuizDetails,
      Quiz: { arr1, arr2, arr3, arr4, arr5, arr6 },
    });
    const info = AddCourse.findOne(
      { CourseName: CourseName },
      async (err, obj) => {
        const NewQuiz = new AddCourse(obj);
        NewQuiz.All_Quizes.push(users);
        NewQuiz.save();
      }
    );
    await users.save();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

// route to add courses to list of enrolled courses of students

router.post("/enrolled", async (req, res) => {
  try {
    const { id } = req.body;
    const setInfo = await User.findOne({ _id: req.userID });
    if (setInfo) {
      const Courses = await setInfo.addCourses(id);
      await setInfo.save();
      res.status(201).json({ message: "Course Enrolled successfully" });
    }
  } catch (e) {
    console.log(e);
  }
});

// router to add new Student informations by admins
router.post("/addStudent", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email_address,
      Phone_No,
      FatherName,
      MotherName,
      FatherMobileNo,
      MotherMobileNo,
      Address,
      Registration,
      StudentClass,
      Gender,
      BirthDate,
      email_id,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email_address ||
      !Phone_No ||
      !FatherName ||
      !MotherName ||
      !Address ||
      !Registration ||
      !StudentClass ||
      !Gender ||
      !BirthDate
    )
      res.status(403).send();
    const StudentDetails = new Admin_AddedStudents({
      firstName,
      lastName,
      email_address,
      Phone_No,
      FatherName,
      MotherName,
      FatherMobileNo,
      MotherMobileNo,
      Address,
      Registration,
      StudentClass,
      Gender,
      BirthDate,
    });
    await StudentDetails.save();
    const info = Admin_User.findOne(
      { email_id: email_id },
      async (err, obj) => {
        const NewAdminInfo = new Admin_User(obj);
        NewAdminInfo.NewStudentDetails.push(StudentDetails);

        NewAdminInfo.save();
      }
    );

    await StudentDetails.save();

    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
});

// All Get Methods are available here ...

router.get("/all-courses", async (req, res) => {
  AddCourse.find({})
    .populate()
    .then((p) => console.log(p))
    .catch((error) => console.log(error));
});

// Route to get all the Questions here ...
router.get("/all-questions", async (req, res) => {
  const info = await Questions.find({});
  res.json({ info });
});

// Route to get all Quizes

router.get("/Quiz", async (req, res) => {
  const info = await QuizQuestions.find({});
  res.json({ info });
});

// Route to get individual Quiz details
router.get("/addtest/:id", async (req, res, next) => {
  id = req.params["id"];
  console.log(id);
  const info = await QuizQuestions.findOne({ _id: id });
  res.json({ info: info });
  console.log(info);
});

// Get details of a particular admin
router.get("/admin-details/:email_id", async (req, res) => {
  email_id = req.params["email_id"];
  const info = await Admin_User.findOne({ email_id: email_id });
  res.json({ info: info });
});

// router to get all the students added by a partcualr admin
router.get("/students/:email_id", async (req, res) => {
  email_id = req.params["email_id"];
  const info1 = await Admin_User.findOne({ email_id: email_id });
  const id = info1.NewStudentDetails;
  const info2 = await Admin_AddedStudents.find({ _id: id });
  res.json({ info: info2 });
});

// route for Logout

router.get("/logout", (req, res, next) => {
  res.clearCookie("jwt_token", { path: "/" });
  res.status(200).send("User logged out");
});

module.exports = router;

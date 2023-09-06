import React, { useState } from "react";
import { useAuth } from "../auth";
import "../Css Files/AddStudents.css";
function AddStudents() {
  const [questions, setQuestions] = useState([{ service: "" }]);
  console.log(questions.length);
  const fun = (e) => {
    e.preventDefault();
    if (questions.length >= 1 && questions.length < 3)
      setQuestions([...questions, { service: "" }]);
    else window.alert("Documents Limit exceeded");
  };
  const auth = useAuth();
  const email_id = auth?.user?.email_id;
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email_address: "",
    Phone_No: "",
    FatherName: "",
    MotherName: "",
    FatherMobileNo: "",
    MotherMobileNo: "",
    Address: "",
    Registration: "",
    StudentClass: "",
    Gender: "",
    BirthDate: "",
  });
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  const PostStudent = async (e) => {
    e.preventDefault();
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
    } = student;
    const res = await fetch("/addStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });
    console.log(res);
  };
  return (
    <div className="add-student">
      <form className="form4" method="POST">
        <div className="heading fs-5">Add Student</div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="studentFirstName">First Name</label>
            <input
              type="text"
              placeholder="Enter Student's first name  here..."
              id="studentFirstName"
              className="form-control"
              name="firstName"
              value={student.firstName}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentLastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter Student's last name here..."
              id="studentLastName"
              className="form-control"
              name="lastName"
              value={student.lastName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label for="EmailAddress">Email Address</label>
            <input
              type="text"
              placeholder="Enter Student's Email address here..."
              id="EmailAddress"
              className="form-control"
              name="email_address"
              value={student.email_address}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentPhoneNumber">
              Phone number<span className="fw-lighter"> (Student)</span>
            </label>
            <input
              type="text"
              placeholder="Enter Student's phone number here..."
              id="studentPhoneNumber"
              className="form-control"
              name="Phone_No"
              value={student.Phone_No}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label for="studentFatherName">Father's Name</label>
            <input
              type="text"
              placeholder="Enter Student's Father name here..."
              id="studentFatherName"
              className="form-control"
              name="FatherName"
              value={student.FatherName}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentName">Mother's Name</label>
            <input
              type="text"
              placeholder="Enter Student mother's name here..."
              id="studentName"
              className="form-control"
              name="MotherName"
              value={student.MotherName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label for="studentFatherNumber">
              Father's Mobile Number{" "}
              <span className="fw-lighter"> (optional)</span>
            </label>
            <input
              type="text"
              placeholder="Enter Father's Mobile Number here..."
              id="studentFatherNumber"
              className="form-control"
              name="FatherMobileNo"
              value={student.FatherMobileNo}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentName">
              Mother's Mobile Number{" "}
              <span className="fw-lighter"> (optional)</span>
            </label>
            <input
              type="text"
              placeholder="Enter Mother's Mobile Number here..."
              id="studentName"
              className="form-control"
              name="MotherMobileNo"
              value={student.MotherMobileNo}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label for="studentName">Address</label>
            <input
              type="text"
              id="studentAddress"
              className="form-control"
              placeholder="Enter Student's address here..."
              name="Address"
              value={student.Address}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label for="studentRegistrationNumber">Registration Number</label>
            <input
              type="text"
              placeholder="Enter Student Registration Number here..."
              id="studentRegistrationNumber"
              className="form-control"
              name="Registration"
              value={student.Registration}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentClass">Class</label>
            <input
              type="text"
              placeholder="Enter Student's Class here..."
              id="studentClass"
              className="form-control"
              name="StudentClass"
              value={student.StudentClass}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 ">
            <label for="studentGender">Gender</label>
            <input
              type="text"
              placeholder="Enter Student's Gender here..."
              id="studentGender"
              className="form-control"
              name="Gender"
              value={student.Gender}
              onChange={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="studentGender">Birth Date</label>
            <input
              type="date"
              placeholder="Enter Student's  Birth Date"
              id="studentBirthDate"
              className="form-control"
              name="BirthDate"
              value={student.BirthDate}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-row">
          {questions.map((item, index) => {
            return (
              <>
                <div className="form-group col-md-4">
                  <label for="question">Upload Documents</label>
                  <input
                    type="file"
                    className="form-control2 d-flex"
                    name="question"
                  />
                </div>
              </>
            );
          })}

          <button
            onClick={fun}
            className="btn btn-outline btn-outline-primary mt-2  outline-0 mb-3"
          >
            Want to add more documents? Yes
          </button>
        </div>

        <div className="form-row d-flex justify-content-center gap-5">
          <div className="form-group ">
            <button className="btn btn-primary btn-lg" onClick={PostStudent}>
              Submit
            </button>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStudents;

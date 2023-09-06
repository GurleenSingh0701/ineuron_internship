import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Css Files/StudentSignUp.css";
function StudentSignUp() {
  const [user, setUser] = useState({
    name: "",
    email_id: "",
    phone_no: "",
    password: "",
    confirm_password: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email_id, phone_no, password, confirm_password } = user;
    const res = await fetch("/student_register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email_id,
        phone_no,
        password,
        confirm_password,
      }),
    });
    const data = res;
    console.log(data.status);
    if (data.status === 422) alert("Fill all the required fields !!!");
    else if (data.status === 403) alert("User already exists !!!");
    else if (data.status === 200) alert("Sign Up Successful !!!");
  };
  return (
    <div className="Student-Signup-page">
      <div className="card">
        <p className="text-center fs-2 fw-medium">Student Signup</p>
        <p className="text-start fs-5 fw-lighter">Create a new Account</p>
        <form method="POST">
          <input
            className="form-control fs-6"
            placeholder="Enter your name here..."
            name="name"
            value={user.name}
            onChange={handleInput}
            required
          />
          <input
            className="form-control fs-6"
            placeholder="Enter your Email Id here..."
            name="email_id"
            value={user.email_id}
            onChange={handleInput}
            required
          />
          <input
            className="form-control fs-6"
            placeholder="Enter your Mobile Number here..."
            name="phone_no"
            value={user.phone_no}
            onChange={handleInput}
          />
          <input
            className="form-control fs-6"
            placeholder="Enter your password here..."
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <input
            className="form-control fs-6"
            placeholder="Confirm Password here..."
            name="confirm_password"
            value={user.confirm_password}
            onChange={handleInput}
          />
          <Link to="/studentLogin/StudentCourses">
            <button
              type="submit"
              className="btn submit-button btn-dark"
              name="submit"
              value="Submit"
              onClick={PostData}
            >
              Submit
            </button>
          </Link>
        </form>

        <span className="ms-start">
          Already have an account?{" "}
          <Link to="/StudentSignIn" className="Sign-in">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default StudentSignUp;

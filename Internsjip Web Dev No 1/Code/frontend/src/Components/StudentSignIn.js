import React, { useState } from "react";
import { Link } from "react-router-dom";

function StudentSignIn() {
  const [user, setUser] = useState({
    email_id: "",
    password: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { email_id, password } = user;
    const res = await fetch("/student_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id,
        password,
      }),
    });
    const data = res;
    console.log(data.status);
    if (data.status === 200) {
      window.alert("Login Successful");
    } else {
      window.alert("Invalid Credentials");
    }
  };
  return (
    <div className="admin-signin-form">
      <div className="card">
        <div class="card-body">
          <p className="text-center fs-2 fw-bold">Student Sign in</p>
          <form className="signin-form" method="POST">
            <input
              className="form-control fs-6"
              placeholder="Enter your email id"
              name="email_id"
              value={user.email_id}
              onChange={handleInput}
            />
            <input
              type="password"
              className="form-control fs-6"
              placeholder="Enter your password"
              name="password"
              value={user.password}
              onChange={handleInput}
            />
            <Link to="/adminLogin/Courses">
              <input
                className="btn submit-button btn-dark"
                name="submit"
                value="submit"
                type="submit"
                onClick={PostData}
              />
            </Link>
            <Link to="/studentsignup">
              <p>Don't have a account? Create Account Now</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentSignIn;

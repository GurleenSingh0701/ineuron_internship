import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css Files/AdminSignIn.css";
import { useAuth } from "../auth";
function AdminSignIn() {
  const [user, setUser] = useState({
    email_id: "",
    password: "",
  });
  const auth = useAuth();

  const Navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    auth.Login(user);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { email_id, password } = user;
    const res = await fetch("/admin_login", {
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
      Navigate("/adminSignUp/Courses");
    } else {
      window.alert("Invalid Credentials");
    }
  };

  return (
    <div className="admin-signin-form">
      <div className="card">
        <div class="card-body">
          <p className="text-center fs-2 fw-bold">Admin Sign in</p>
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
              <button
                className="btn submit-button btn-dark"
                name="submit"
                value="submit"
                type="submit"
                onClick={PostData}
              >
                Submit
              </button>
            </Link>
            <Link to="/adminLogin">
              <p>Don't have a account? Create Account Now</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminSignIn;

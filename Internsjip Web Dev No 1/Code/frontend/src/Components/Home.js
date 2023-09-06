import React from "react";
import { Link } from "react-router-dom";
import "../Css Files/Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="card-outer">
        <div class="welcome-card">
          <h3 className="text-center fs-3 fw-bold">Welcome back</h3>
          <div className="Login">
            <Link to="/adminLogin">
              <button className="btn btn-dark btn-block">Admin</button>
            </Link>
            <span className="text-center fs-5 mt-1 mb-1">or</span>
            <Link to="/studentsignup">
              <button className="btn btn-dark">Student</button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;

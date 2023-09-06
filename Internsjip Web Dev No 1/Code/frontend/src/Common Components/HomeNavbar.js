import React from "react";
import { Link } from "react-router-dom";
import './HomeNavbar.css';
function HomeNavbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="www.google.com">
          <i class="bi bi-bootstrap-fill"></i> Navbar 
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav  mt-1 fs-5 ms-auto">
            <li class="nav-item active">
              <Link className="nav-link" to="/">
              <i class="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/studentSignIn">
              <i class="bi bi-person-circle"></i> Student SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminSignIn">
              <i class="bi bi-person-circle "></i> Admin SignIn
              </Link>
            </li>
           
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default HomeNavbar;

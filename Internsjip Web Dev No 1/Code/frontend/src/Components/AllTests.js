import axios from "axios";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Css Files/AddTests.css";

function AddTests() {
  const Navigate = useNavigate();
  const [Quiz, setQuiz] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    axios
      .get("/Quiz")
      .then((response) => {
        setQuiz(response.data.info);
        setStatus(response.status);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          setStatus(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);
  console.log("The status is ", status);
  if (status === 200) {
    return (
      <div className="add-test">
        {Quiz?.map((item) => {
          return (
            <div className="card">
              <div>{item.CourseName}</div>
              <div className="d-flex justify-content-between">
                <div>{item.QuizDetails}</div>
                <div>
                  <Link to={`/adminLogin/courses/addtest/${item._id}`}>
                    <button className="btn btn-outline-primary">
                      Play Quiz
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (status === 401 || status === 500) {
    alert("Please Login or Singup to access this page");
    Navigate("../adminLogin", { replace: true });
  }
}

export default AddTests;

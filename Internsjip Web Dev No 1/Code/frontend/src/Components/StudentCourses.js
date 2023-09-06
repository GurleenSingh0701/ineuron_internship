import React from "react";

import { Link } from "react-router-dom";
import "../Css Files/StudentCourses.css";
import course_img from "../images/course1.jpeg";
import { useQuery } from "react-query";
import axios from "axios";

function StudentCourses() {
  const { data } = useQuery("courses", () => {
    return axios.get(`http://localhost:9000/CourseDetails`);
  });

  const PostData = async (info) => {
    const id =info;
    console.log(id);
    const res = await fetch("/enrolled", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data1 = res;
    console.log(data1);
  };
  return (
    <div className="container">
      <div className="Student-courses-page">
        {data?.data.map((name) => {
          return (
            <div className="courses">
              <div className="courses-card">
                <img
                  className="card-img-top"
                  src={course_img}
                  alt="courseImage"
                ></img>
                <div className="courses-card-inner">
                  <h5 className="card-title">{name.CourseName}</h5>
                  <p className="card-text">{name.CourseDetails}</p>
                  <Link to={`/adminLogin/Courses/${name.id}`}>
                    <button
                      className="btn btn-dark"
                      key={name.id}
                      onClick={() => {
                        PostData(name.id);
                      }}
                    >
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <Link to="/">
          <button className="btn btn-primary btn-xxl">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default StudentCourses;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css Files/Courses.css";

import axios from "axios";
function Courses() {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/all-courses").then((response) => {
      setData(response.data.info);
      console.log(response.data.info);
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="CoursesDetails">
        {data?.map((name) => {
          return (
            <div className="courses">
              <div className="courses-card">
                <div className="courses-card-inner">
                  <h5 className="card-title">{name.CourseName}</h5>
                  <p className="card-text">{name.CourseDetails}</p>
                  <div className="all-questions">
                    {name.All_Questions.map((item) => {
                      return <p>{item}</p>;
                    })}
                  </div>
                  <Link to={`/Courses/${name.id}`}>
                    <button className="btn btn-dark" key={name.id}>
                      Edit Course
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;

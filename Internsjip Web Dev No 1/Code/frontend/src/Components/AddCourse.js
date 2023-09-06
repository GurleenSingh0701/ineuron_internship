import React, { useState } from "react";
import "../Css Files/AddCourse.css";
import { useAuth } from "../auth";
function AddCourse() {
  const auth = useAuth();
  const [course, setCourse] = useState({
    CourseName: "",
    CourseCode: "",
    CourseNo: "",
    CourseDetails: "",
  });
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCourse({ ...course, [name]: value });
  };

  const PostCourse = async (e) => {
    e.preventDefault();
    const email_id = auth.user?.email_id;
    const { CourseName, CourseCode, CourseNo, CourseDetails } = course;
    const res = await fetch("/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id,
        CourseName,
        CourseCode,
        CourseNo,
        CourseDetails,
      }),
    });
    console.log(res);

    // axios
    //   .post("/addCourse", {
    //     CourseName,
    //     CourseCode,
    //     CourseNo,
    //     CourseDetails,
    //   },
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="add-course">
      <form className="form2">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4" className="fw-lighter">
              Course Name
            </label>
            <input
              type="text"
              class="form-control2"
              id="inputEmail4"
              placeholder="Enter the Course Name here..."
              name="CourseName"
              value={course.CourseName}
              onChange={handleInput}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4" className="fw-lighter">
              Course Code
            </label>
            <input
              type="text"
              class="form-control2"
              placeholder="Enter the Course Code here..."
              name="CourseCode"
              value={course.CourseCode}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div class="form-group col-md-6">
            <label for="inputAddress" className="fw-lighter">
              Course Details
            </label>
            <input
              type="text"
              className="form-control2"
              id="courseDetails"
              placeholder="Enter the Course Details here..."
              name="CourseDetails"
              value={course.CourseDetails}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div class="form-group">
            <label for="inputZip" className="fw-lighter">
              Course number
            </label>
            <input
              type="number"
              class="form-control2"
              id="CourseNumber"
              name="CourseNo"
              value={course.CourseNo}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="d-flex gap-5 pt-2">
          <button
            type="submit"
            className="btn btn-primary submit-courseDetails-btn"
            onClick={PostCourse}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-primary submit-courseDetails-btn"
          >
            Cancel
          </button>
        </div>
        {/* <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputAddress2" className="fw-lighter">
              Start date
            </label>
            <input
              type="date"
              className="form-control2"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputCity" className="fw-lighter">
              Course Time Length
            </label>
            <input type="text" className="form-control2" id="inputCity" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputState" className="fw-lighter">
              Course Price
            </label>
            <input type="text" className="form-control2" id="inputCity" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputZip" className="fw-lighter">
              Course Professor
            </label>
            <input type="text" class="form-control2" id="inputZip" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputZip" className="fw-lighter">
              Maximum Student
            </label>
            <input type="number" class="form-control2" id="inputZip" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputZip" className="fw-lighter">
              Course number
            </label>
            <input type="number" class="form-control2" id="inputZip" />
          </div>
          <div className="form-group col-md-12">
            <label for="inputCourseMaterials" className="fw-lighter">
              Course Materials
            </label>
            <input
              type="file"
              class="form-control2"
              id="inputCourseMaterials"
              multiple
            />
            <label for="inputCourseMaterials" className="fw-lighter">
              Want to add more materials ?
            </label>
          </div>
          <div className="d-flex gap-5">
            <button
              type="submit"
              className="btn btn-primary submit-courseDetails-btn"
            >
              Sign in
            </button>
            <button
              type="submit"
              className="btn btn-primary submit-courseDetails-btn"
            >
              Cancel
            </button>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default AddCourse;

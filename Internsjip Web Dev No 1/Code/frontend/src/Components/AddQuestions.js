import React, { useState } from "react";
import "../Css Files/AddQuestions.css";
function AddQuestions() {
  const [question, setQuestion] = useState({
    CourseName: "",
    CourseCode: "",
    Question: "",
    Answer: "",
    imp: "",
  });

  let name, value, checked;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    checked = e.target.checked;
    if (checked && name === "imp")
      setQuestion({ ...question, [name]: value, imp: true });
    setQuestion({ ...question, [name]: value, imp: false });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { CourseName, CourseCode, Question, Answer, imp } = question;

    const res = await fetch("/Questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CourseName,
        CourseCode,
        Question,
        Answer,
        imp,
      }),
    });
    const data = res;
    console.log(res);
    if (data.status === 200) {
      window.alert("Question was added successfully");
    } else if (data.status === 403) window.alert("Please all the details ");
    else {
      window.alert("Question was not added successfully, Try again");
    }
  };
  return (
    <div className="add-question">
      <form className="form3" method="POST">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="CourseName">Course Name</label>
            <input
              className="form-control"
              id="CourseName"
              name="CourseName"
              value={question.CourseName}
              onChange={handleInput}
              placeholder="Enter Course name here..."
            />
          </div>
          <div className="form-group col-md-6">
            <label for="CourseCode">Course Code</label>
            <input
              className="form-control"
              id="CourseCode"
              placeholder="Enter Course code here..."
              name="CourseCode"
              value={question.CourseCode}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="Question">Question</label>
          <textarea
            className="form-control"
            id="Question"
            name="Question"
            value={question.Question}
            onChange={handleInput}
            placeholder="Enter Question here..."
          />
        </div>
        <div className="form-group">
          <label for="Answer">Answer</label>
          <textarea
            type="text"
            className="form-control"
            id="Answer"
            name="Answer"
            value={question.Answer}
            onChange={handleInput}
            placeholder="Enter Answer here..."
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="imp"
            name="imp"
            onChange={handleInput}
          />
          <label className="form-check-label" for="imp">
            Mark, If this is an important question
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={PostData}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddQuestions;

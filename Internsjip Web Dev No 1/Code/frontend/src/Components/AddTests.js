

import React, { useState } from "react";
import "../Css Files/AllTests.css";
import axios from "axios";
function AllTests() {
  const [info, setInfo] = useState({
    CourseName: "",
    CourseCode: "",
    QuizDetails: "",
  });
  const [questions, setQuestions] = useState([
    {
      Question: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      Answer4: "",
      CorrectOption: "",
    },
  ]);

  let name, value;
  const handleInput = async (e, index) => {
    name = e.target.name;
    value = e.target.value;
    const questionsList = [...questions];
    questionsList[index][name] = value;
    setQuestions(questionsList);
  };

  let name1, value1;
  const handleInfoData = (e) => {
    name1 = e.target.name;
    value1 = e.target.value;
    setInfo({ ...info, [name1]: value1 });
  };

  const fun = (e) => {
    e.preventDefault();
    if (questions.length > 9 || questions.length < 1) {
      window.alert("No more questions allowed");
      PostData();
    } else {
      setQuestions([...questions, { questions }]);
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { CourseName, CourseCode, QuizDetails } = info;
    let arr1 = [],
      arr2 = [],
      arr3 = [],
      arr4 = [],
      arr5 = [],
      arr6 = [];
    for (let i = 0; i < questions.length; i++) {
      arr1.push(questions[i].Question);
      arr2.push(questions[i].Answer1);
      arr3.push(questions[i].Answer2);
      arr4.push(questions[i].Answer3);
      arr5.push(questions[i].Answer4);
      arr6.push(questions[i].CorrectOption);
    }
    let data1, data2;
    try {
      var res = await axios.post("/Quiz-Questions", {
        CourseName,
        CourseCode,
        QuizDetails,
        arr1,
        arr2,
        arr3,
        arr4,
        arr5,
        arr6,
      });
      data1 = res.status;
    } catch (err) {
      data2 = err.response.status;
    }
    if (data1 === 200) {
      window.alert("Quiz was added successfully ");
      setInfo({ CourseName: "", CourseCode: "", QuizDetails: "" });

      setQuestions([
        {
          Question: "",
          Answer1: "",
          Answer2: "",
          Answer3: "",
          Answer4: "",
          CorrectOption: "",
        },
      ]);
    } else if (data2 === 403)
      window.alert("Please Fill in the Complete details");
  };

  return (
    <div>
      <div className="all-tests-question pt-5" method="POST">
        <form>
          <div className="card d-flex flex-column" style={{ width: "50rem" }}>
            <h5 class="card-title pt-5 pl-3 text-center pb-3">
              Create a new MCQs Quiz Here !!!
            </h5>
            <p className="pl-3 text-muted">
              * Minimum 3 Questions are required
            </p>
            <div>
              <p className="pl-3 fw-light">Course Details</p>
              <div className="form-row pl-3 pr-3">
                <div className="form-group col-md-6">
                  <label for="CourseName">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Course Name here..."
                    name="CourseName"
                    id="CourseName"
                    value={info.CourseName}
                    onChange={handleInfoData}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="CourseCode">Course Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Course Code here..."
                    name="CourseCode"
                    id="CourseCode"
                    value={info.CourseCode}
                    onChange={handleInfoData}
                  />
                </div>
              </div>
              <div className="form-row pl-3 pr-3">
                <label for="QuizDetails">Quiz Details</label>
                <textarea
                  type="text"
                  className="form-control col-md-12"
                  placeholder="Enter the details about the quiz here..."
                  name="QuizDetails"
                  id="QuizDetails"
                  value={info.QuizDetails}
                  onChange={handleInfoData}
                ></textarea>
              </div>
            </div>
            <div class="card-body">
              {questions.map((item, index) => {
                return (
                  <>
                    {" "}
                    <div className="fs-5 fw-lighter">Add Question here...</div>
                    <div class="card-text">
                      <label for="question">Question</label>
                      <input
                        type="text"
                        class="form-control col-md-12"
                        placeholder="Enter the question here..."
                        name="Question"
                        id="Question"
                        value={item.Question}
                        key={index}
                        onChange={(e) => handleInput(e, index)}
                      />
                      <label for="answer">Answer</label>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Enter the Answer 1 here..."
                            name="Answer1"
                            id="Answer1"
                            value={item.Answer1}
                            key={index}
                            onChange={(e) => handleInput(e, index)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Enter the Answer 2 here..."
                            name="Answer2"
                            id="Answer2"
                            value={item.Answer2}
                            key={index}
                            onChange={(e) => handleInput(e, index)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Enter the Answer 3 here..."
                            name="Answer3"
                            id="Answer3"
                            value={item.Answer3}
                            key={index}
                            onChange={(e) => handleInput(e, index)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Enter the Answer 4 here..."
                            name="Answer4"
                            id="Answer4"
                            value={item.Answer4}
                            onChange={(e) => handleInput(e, index)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Correct Option</label>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Enter the Correct option here..."
                            name="CorrectOption"
                            id="CorrectOption"
                            value={item.CorrectOption}
                            key={index}
                            onChange={(e) => handleInput(e, index)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="form-row px-3">
              <div className="form-group col-md-6">
                <button
                  onClick={fun}
                  className="btn btn-md btn-outline-primary mt-2 "
                >
                  Want to add more questions? Yes
                </button>
              </div>
              <div className="form-group col-md-6">
                <input
                  type="submit"
                  name="submit"
                  value="submit"
                  onClick={PostData}
                  className="btn btn-md btn-primary mt-2"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AllTests;

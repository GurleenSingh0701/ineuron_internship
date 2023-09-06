import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "../Css Files/QuizDetailed.css";

function QuizDetailed(props) {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    axios.get(`/addtest/${id}`).then((response) => {
      setQuiz(response.data.info);
    });
  }, [id]);

  const [ans1, setAns1] = useState([]);
  var questions = [],
    correctOptions = [],
    questionSet,
    correctOptionsSet;

  const handleSolution = (e, i) => {
    var length = 0;
    quiz?.Quiz?.forEach((item, index) => {
      length = item.arr1.length;
      questions.push(item.arr1);
      questionSet = questions.toString();
      correctOptions.push(item.arr6);
      correctOptionsSet = correctOptions.toString();
      return "";
    });
    questions = questionSet.split(",");
    correctOptions = correctOptionsSet.split(",");
    // console.log("The correct options are", correctOptions);
    for (var a = 0; a < length; a++) {
      setAns1({ ...ans1, [questions[i - 1]]: e.target.value });
    }
    return "", correctOptions, questions, ans1;
  };

  const onSubmit = (e) => {
    handleSolution(e);
    let c = 0;
    e.preventDefault();
    var questions1 = questions,
      correctOptions1 = correctOptions,
      newSet = {};
    for (var i = 0; i < questions1.length; i++) {
      newSet[questions[i]] = correctOptions1[i];
    }
    console.log(Object.entries(ans1) === Object.entries(newSet));
    for (const [key, value] of Object.entries(ans1)) {
      for (const [key1, value1] of Object.entries(newSet)) {
        if (key1 === key && value1 === value) {
          c = c + 1;
        }
      }
    }
    console.log("Your Score is ", c);
  };

  return (
    <div className="d-flex flex-column gap-5 justify-content-between p-5 justify-content-center">
      <div className="fs-3 fw-lighter ">
        You are Playing {quiz?.CourseName} Quiz Now
      </div>
      {quiz?.Quiz?.map((item, index) => {
        return [...Array(item.arr1.length)].map((e, i) => (
          <div key={i}>
            <p className="fs-1">
              {i + 1}. <span>{item.arr1[i]}</span>
            </p>
            <div className="d-flex flex-column  form-row fs-3 pl-2">
              <div className="form-group">
                <input
                  type="radio"
                  name={item.arr2[i]}
                  value={item.arr2[i]}
                  onChange={(e, item) => handleSolution(e, i + 1)}
                />
                <label className="pl-3" htmlFor="ans2">
                  {item.arr2[i]}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="answer2"
                  name={item.arr2[i]}
                  value={item.arr3[i]}
                  onChange={(e, item) => handleSolution(e, i + 1)}
                  // className={`form-check-input ${
                  //   user.selected ? "selected" : "not-selected"
                  // }`}
                />
                <label className="pl-3" htmlFor="ans2">
                  {item.arr3[i]}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="answer3"
                  name={item.arr2[i]}
                  value={item.arr4[i]}
                  onChange={(e, item) => handleSolution(e, i + 1)}
                  // className={`form-check-input ${
                  //   user.selected ? "selected" : "not-selected"
                  // }`}
                />
                <label className="pl-3" htmlFor="ans3">
                  {item.arr4[i]}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="answer4"
                  name={item.arr2[i]}
                  value={item.arr5[i]}
                  onChange={(e, item) => handleSolution(e, i + 1)}
                  // className={`form-check-input ${
                  //   user.selected ? "selected" : "not-selected"
                  // }`}
                />
                <label className="pl-3" htmlFor="ans4">
                  {item.arr5[i]}
                </label>
              </div>
            </div>
          </div>
        ));
      })}
      <button className="btn btn-primary w-10" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export default QuizDetailed;

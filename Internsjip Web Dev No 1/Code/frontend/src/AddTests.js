// import React,{useState} from "react";
// import { Link } from "react-router-dom";
// import "../Css Files/AddTests.css";
// import data from "../db.json";
// import course_img from "../images/course1.jpeg";
// function AddTests() {
//   console.log(data);
//   return (
//     <div className="add-test">
//       <div className="Test-box">
//       {data?.data.map((name) => {
//           return (
//             <div className="courses">
//               <div className="courses-card">
//                 <img
//                   className="card-img-top"
//                   src={course_img}
//                   alt="courseImage"
//                 ></img>
//                 <div className="courses-card-inner">
//                   <h5 className="card-title">{name.CourseName}</h5>
//                   <p className="card-text">{name.CourseDetails}</p>
//                   <Link to={`/Courses/${name.id}`}>
//                     <button className="btn btn-dark" key={name.id}>
//                       Edit Course
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default AddTests;

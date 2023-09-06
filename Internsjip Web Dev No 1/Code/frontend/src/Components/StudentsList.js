import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import "../Css Files/StudentList.css";
import axios from "axios";
function StudentsList() {
  const [StudentsList, setStudentsList] = useState([]);
  const auth = useAuth();
  const email_id = auth.user.email_id;
  useEffect(() => {
    axios
      .get(`/students/${email_id}`, { params: { email_id: email_id } })
      .then((response) => {
        setStudentsList(response.data.info);
        console.log(response.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email_id]);

  return (
    <div className="student-list">
      <table class="table table-hover">
        <caption className="pl-2 pt-3">List of Students</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">SNo.</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {StudentsList?.map((item, i) => {
            return (
              <>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email_address}</td>
                  <td>{item.Phone_No}</td>
                  <td>{item.Gender}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsList;

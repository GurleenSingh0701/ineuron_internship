import React, { useEffect, useState } from "react";
import "../Css Files/Dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import "./Side.js";
import { useAuth } from "../auth";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["100-80", "80-60", "60-40", "40-20", "20-0"],
  datasets: [
    {
      data: [10, 10, 20, 30, 40, 50],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [details, setDetails] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const auth = useAuth();
  const email_id = auth.user.email_id;
  console.log(localStorage.getItem('token'));
  useEffect(() => {
    const axiosrequest1 = axios.get(`/admin-details/${email_id}`, {
      params: { email_id: email_id },
    });
    const axiosrequest2 = axios.get("/Quiz");
    const axiosrequest3 = axios.get("/all-questions");
    axios
      .all([axiosrequest1, axiosrequest2, axiosrequest3])
      .then(
        axios.spread(function (res1, res2, res3) {
          setDetails(res1.data.info);
          setQuiz(res2.data.info);
          setQuestions(res3.data.info);
          console.log(res3.data.info);
        })
      )
      .catch(function (err) {
        console.log(err);
      });
  }, [email_id]);

  return (
    <div className="dashboard">
      <div className="widgets">
        <div className="dashboard-cards fs-5">
          Total Courses Uploaded
          <div className="fs-2">
            {details.CourseCreatedBy?.length}{" "}
            <i className="bi bi-arrow-up-circle icon"></i>
          </div>
        </div>

        <div className="dashboard-cards fs-5">
          Total Questions uploaded
          <div className="fs-2">
            {questions.length}
            <i className="bi bi-arrow-up-circle icon"></i>
          </div>
        </div>
        <div className="dashboard-cards fs-5">
          Test Series Added Till Now
          <div className="fs-2">
            {quiz?.length} <i className="bi bi-arrow-up-circle icon"></i>
          </div>
        </div>
      </div>
      <div className="student">
        <TableContainer>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ borderLeftColor: "white" }}>
                  Dessert (100g serving)
                </StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="ml-auto chart">
        <h1 className="mt-5 fs-2 fw-light pl-5 pt-5 pr-5">Student'Results</h1>
        <Pie data={data} className="pie-chart pl-5 pt-5" />
      </div>
    </div>
  );
}

export default Dashboard;

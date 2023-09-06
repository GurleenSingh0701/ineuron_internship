
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AdminSignUp from "./Components/AdminSignUp";
import AdminSignIn from "./Components/AdminSignIn";
import StudentSignUp from "./Components/StudentSignUp";
import StudentSignIn from "./Components/StudentSignIn";
import StudentCourses from "./Components/StudentCourses";
import CourseDetails from "./Components/CourseDetails";
import AddCourse from "./Components/AddCourse";
import HomeNavbar from "./Common Components/HomeNavbar";
import AdminNavbar from "./Common Components/AdminNavbar";
import StudentNavbar from "./Common Components/StudentNavbar";
import Courses from "./Components/Courses";
import Side from "./Components/Side";
import Dashboard from "./Components/Dashboard";
import StudentsList from "./Components/StudentsList";
import Signout from "./Components/Signout";
import Questions from "./Components/Questions";
import AddQuestions from "./Components/AddQuestions";
import AddStudents from "./Components/AddStudents";
import AllTests from "./Components/AllTests";
import AddTests from "./Components/AddTests";
import QuizDetailed from "./Components/QuizDetailed";

import { useReducer } from "react";

import { Reducer, initialState } from "./hooks/useReducer";

import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";

function App() {
  const queryClient = new QueryClient();

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/" element={[<HomeNavbar />, <Home />]}></Route>
            <Route
              path="/adminSignUp"
              element={[<AdminNavbar />, <AdminSignUp />]}
            ></Route>
            <Route
              path="/studentSignUp"
              element={[<StudentNavbar />, <StudentSignUp />]}
            ></Route>
            <Route path="/StudentSignIn" element={<StudentSignIn />}></Route>
            <Route path="/AdminSignIn" element={<AdminSignIn />}></Route>
            <Route
              path="/studentCourses/courses"
              element={<StudentCourses />}
            ></Route>
            <Route
              path="/adminSignUp/Courses"
              element={[<Side />, <Courses />]}
            ></Route>
            <Route
              path="/adminSignUp/Courses/:id"
              element={
                <RequireAuth>
                  [<Side />, <CourseDetails />]
                </RequireAuth>
              }
            ></Route>

            <Route
              path="/adminSignUp/Courses/AddCourse"
              element={
                <RequireAuth>
                  [<Side />, <AddCourse />]
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/Dashboard"
              element={
                <RequireAuth>
                  <Side /> <Dashboard />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/AllCourses"
              element={[<Side />, <Courses />]}
            ></Route>
            <Route
              path="/adminSignUp/Courses/StudentsList"
              element={
                <RequireAuth>
                  <Side /> <StudentsList />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/Signout"
              element={
                <RequireAuth>
                  [<Side />, <Signout />]
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/Questions"
              element={
                <RequireAuth>
                  [<Side />, <Questions />]
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/AddQuestions"
              element={[<Side />, <AddQuestions />]}
            ></Route>

            <Route
              path="/adminSignUp/Courses/AddStudents"
              element={
                <RequireAuth>
                  [<Side />, <AddStudents />]
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/AllTest"
              element={
                <RequireAuth>
                  [<Side />, <AllTests />]
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/adminSignUp/Courses/AddTest"
              element={[<Side />, <AddTests />]}
            ></Route>
            <Route
              path="/adminSignUp/Courses/AddTest/:id"
              element={<QuizDetailed />}
            ></Route>
          </Routes>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import "../Css Files/Side.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import Logout from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupIcon from "@mui/icons-material/Group";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuizIcon from "@mui/icons-material/Quiz";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth";

function Side() {
  const { collapseSidebar } = useProSidebar();
  const [value, setValue] = useState(true);
  const auth = useAuth();
  console.log(auth);
  const showAlert = () => {
    const info = window.confirm("Are you sure you want to Logout?");
    console.log(info);
    if (info === true) {
      auth.Logout();
    }
  };

  return (
    <div className={value ? "sidebar" : "sidebar toggled"}>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <Menu iconShape="circle">
          <MenuItem
            icon={<MenuIcon />}
            onClick={() => {
              collapseSidebar();
              setValue(!value);
            }}
          >
            <span>Admin Panel</span>
          </MenuItem>
          <NavLink to="/adminSignUp/Courses/Dashboard" className="nav-link1">
            <MenuItem icon={<DashboardIcon />}>Dashboard </MenuItem>
          </NavLink>
          <SubMenu icon={<SchoolIcon />} label="Courses" className="nav-link1">
            <NavLink to="/adminSignUp/Courses" className="nav-link1">
              <MenuItem icon={<SchoolIcon />} className="sub-menu">
                All Courses
              </MenuItem>
            </NavLink>
            <NavLink to="/adminSignUp/Courses/AddCourse" className="nav-link1">
              <MenuItem icon={<AddCircleIcon />} className="sub-menu">
                {" "}
                Add new Course{" "}
              </MenuItem>
            </NavLink>
          </SubMenu>

          <SubMenu
            icon={<QuestionAnswerIcon />}
            label="Questions"
            className="nav-link1"
          >
            <NavLink to="/adminSignUp/Courses/Questions" className="nav-link1">
              <MenuItem icon={<SchoolIcon />} className="sub-menu">
                All Questions
              </MenuItem>
            </NavLink>
            <NavLink
              to="/adminSignUp/Courses/AddQuestions"
              className="nav-link1"
            >
              <MenuItem icon={<AddCircleIcon />} className="sub-menu">
                {" "}
                Add New Questions
              </MenuItem>
            </NavLink>
          </SubMenu>

          <SubMenu icon={<QuizIcon />} label="Test" className="nav-link1">
            <NavLink to="/adminSignUp/Courses/AllTest" className="nav-link1">
              <MenuItem icon={<GroupIcon />} className="sub-menu">
                All Tests
              </MenuItem>
            </NavLink>
            <NavLink to="/adminSignUp/Courses/AddTest" className="nav-link1">
              <MenuItem icon={<AddCircleIcon />} className="sub-menu">
                {" "}
                Add New Tests
              </MenuItem>
            </NavLink>
          </SubMenu>
          <SubMenu
            icon={<Groups2Icon />}
            label="Students"
            className="nav-link1"
          >
            <NavLink
              to="/adminSignUp/Courses/StudentsList"
              className="nav-link1"
            >
              <MenuItem icon={<GroupIcon />} className="sub-menu">
                All Students
              </MenuItem>
            </NavLink>
            <NavLink
              to="/adminSignUp/Courses/AddStudents"
              className="nav-link1"
            >
              <MenuItem icon={<PersonAddIcon />} className="sub-menu">
                {" "}
                Add New Students
              </MenuItem>
            </NavLink>
          </SubMenu>
          <NavLink to="/adminSignUp/Courses/Signout" className="nav-link1">
            <MenuItem
              icon={<Logout />}
              onClick={() => {
                showAlert();
              }}
            >
              Signout
            </MenuItem>
          </NavLink>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Side;

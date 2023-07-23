import "./App.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  Link,
} from "react-router-dom";
import Layout2 from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import Workouts from "./components/Workouts/Workouts";
import EditWorkouts from "./components/Workouts/EditWorkout";
import AddWorkout from "./components/Workouts/AddWorkout";
import Exercises from "./components/Exercises/Exercises";
import AddExercise from "./components/Exercises/AddExercise";
import EditExercise from "./components/Exercises/EditExercise";
import DetailedExercise from "./components/Exercises/DetailedExercise";
import Comments from "./components/Comments/Comments";
import CommentsAdd from "./components/Comments/CommentsAdd";
import CommentDetailed from "./components/Comments/CommentDetailed";
import CommentEdit from "./components/Comments/CommentEdit";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";
const ROLES = {
  User: "User",
  Admin: "Admin",
};
const { Header, Content, Footer } = Layout;

const userRole = ROLES.Admin;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <Layout
      className="layout"
      style={{
        height: "100vh",
      }}
    >
      <Header style={{ background: "#4634bc" }}>
        <div className="logo" />
        <Link to="/" style={{ color: "#ffffff", fontSize: 30 }}>
          <AiFillHome />
          <span>Home</span>
        </Link>

        <Link
          to="/workouts"
          style={{ paddingLeft: 20, color: "#ffffff", fontSize: 30 }}
        >
          <span>Workouts</span>
        </Link>
        <Link
          to="/login"
          style={{ paddingLeft: 20, color: "#ffffff", fontSize: 30 }}
        >
          <span>Login</span>
          <FiLogIn />
        </Link>

        <span
          style={{
            float: "right",
            paddingLeft: 20,
            color: "#c7c7c7",
            fontSize: 15,
          }}
        >
          Welcome {auth.user}! Your role is {auth.roles}
        </span>
      </Header>
      <Content
        style={{
          padding: "0 50px",
          textAlign: "center",
        }}
      >
        <div>
          <h2 style={{ color: "black", fontSize: 40 }}>S&S Sporto klubas</h2>
        </div>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout2 />}>
              {/* public routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              <Route path="workouts" element={<Workouts />} />
              <Route path="workouts/edit" element={<EditWorkouts />} />
              <Route path="workouts/add" element={<AddWorkout />} />

              <Route path="exercises" element={<Exercises />} />
              <Route path="exercises/edit" element={<EditExercise />} />
              <Route path="exercises/add" element={<AddExercise />} />
              <Route path="exercises/detailed" element={<DetailedExercise />} />

              <Route path="comments" element={<Comments />} />
              <Route path="comments/add" element={<CommentsAdd />} />
              <Route path="comments/detailed" element={<CommentDetailed />} />
              <Route path="comments/edit" element={<CommentEdit />} />

              <Route
                element={<RequireAuth allowedRoles={[ROLES.SimpleUser]} />}
              ></Route>
              {/* Home */}
            </Route>
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};
export default App;

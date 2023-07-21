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

const ROLES = {
  SimpleUser: "SimpleUser",
  Admin: "Admin",
};
const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
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
          to="/login"
          style={{ float: "right", color: "#ffffff", fontSize: 30 }}
        >
          <span>Login</span>
          <FiLogIn />
        </Link>
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
              {/* <Route path="exercises" element={<Exercises />} />
              <Route path="exercises/detailed" element={<ExerciseDetailed />} />

              <Route path="comments" element={<Questions />} />
              <Route path="comments/detailed" element={<QuestionDetailed />} />
              <Route path="comments/add" element={<AddQuestion />} /> */}
              {/* Home */}
            </Route>
          </Routes>
        </div>
      </Content>
      <Footer
        className="fixed-bottom"
        style={{
          textAlign: "center",
        }}
      >
        ©2023 Created by Benas Vasiliauskas
        <img style={{ maxWidth: "250px" }} />
      </Footer>
    </Layout>
  );
};
export default App;

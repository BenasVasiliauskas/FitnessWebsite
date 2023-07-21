import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
//import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
import React from "react";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useAuth();
  //const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const decoded = decode(accessToken);
      if (
        !decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] == "SimpleUser"
      ) {
        const roles = ["SimpleUser", ""];
        setAuth({ user, pwd, roles, accessToken });
      } else {
        const roles =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        setAuth({ user, pwd, roles, accessToken });
      }
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("User name or password is invalid.");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <br></br>
      <h1 style={{ fontSize: 30 }}>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 20 }} htmlFor="username">
          Username:
        </label>
        <br></br>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <br></br>
        <label style={{ fontSize: 20 }} htmlFor="password">
          Password:
        </label>
        <br></br>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <br></br>
        <br></br>
        <button
          style={{
            backgroundColor: "green",
            color: "#fff",
            width: 80,
            height: 40,
            fontSize: 20,
          }}
        >
          Sign In
        </button>
        <br></br>
        <br></br>
      </form>
      <p style={{ fontSize: 20 }}>
        Need an Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;

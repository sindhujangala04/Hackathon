// Login.jsx

import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "./Auth.css";

const Login = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  // input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // login
  const handleLogin =
    async () => {

      try {

        const res =
          await axios.post(
            "http://localhost:8085/api/login",
            form,
            {
              withCredentials: true,
            }
          );

        if (
          res.data ===
          "Login successful"
        ) {

          alert(
            "Login Successful"
          );

          navigate("/home");

        } else {

          setError(
            "Invalid Credentials"
          );

        }

      } catch (err) {

        console.log(err);

        setError(
          "Server Error"
        );

      }

    };

  return (

    <div className="container">

      <div className="form-box">

        <h2>
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
        >
          Login
        </button>

        {error && (

          <p className="error">
            {error}
          </p>

        )}

        <p>

          New User ?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;
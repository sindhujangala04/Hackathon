// Login.jsx

import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Auth.css";

const Login = () => {

  // navigation
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // error state
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // handle login
  const handleLogin = () => {

    // simple frontend validation

    if (
      form.email === "" ||
      form.password === ""
    ) {

      setError(
        "Please fill all fields"
      );

      return;

    }

    // clear error

    setError("");

    // success message

    alert("Login Successful");

    // navigate to home page

    navigate("/home");

  };

  return (

    <div className="container">

      <div className="form-box">

        <h2>
          Login
        </h2>

        {/* Email Input */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password Input */}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* Login Button */}

        <button
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Error Message */}

        {error && (

          <p className="error">

            {error}

          </p>

        )}

        {/* Register Link */}

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
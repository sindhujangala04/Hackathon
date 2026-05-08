// Register.jsx

import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Auth.css";

const Register = () => {

  // navigation
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // error state
  const [error, setError] = useState("");

  // handle input changes
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // handle register
  const handleRegister = () => {

    // validation

    if (
      form.username === "" ||
      form.email === "" ||
      form.phone === "" ||
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

    alert(
      "Registration Successful"
    );

    // navigate to login page

    navigate("/login");

  };

  return (

    <div className="container">

      <div className="form-box">

        <h2>
          Register
        </h2>

        <form
          onSubmit={(e) => {

            e.preventDefault();

            handleRegister();

          }}
        >

          {/* Username */}

          <input
            type="text"
            name="username"
            placeholder="Enter Name"
            value={form.username}
            onChange={handleChange}
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* Phone */}

          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
          />

          {/* Register Button */}

          <button type="submit">

            Register

          </button>

        </form>

        {/* Error Message */}

        {error && (

          <p className="error">

            {error}

          </p>

        )}

        {/* Login Link */}

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;
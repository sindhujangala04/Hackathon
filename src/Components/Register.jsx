import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // Register Function
  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8082/api/register",
        form
      );

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }
  };

  return (
    <div className="container">

      <div className="form-box">

        <h2>Register</h2>

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
            required
            title="Please enter your name"
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone Number */}

          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 Digit Number"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            required
            title="Phone number must contain exactly 10 numbers"
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            pattern=".{4,}"
            required
            title="Password must contain minimum 4 characters"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
};

export default Register;
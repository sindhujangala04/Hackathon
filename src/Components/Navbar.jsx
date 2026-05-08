import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // dummy user (frontend only)
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
  });

  // simulate fetching user
  useEffect(() => {

    // frontend only simulation
    setUser({
      username: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
    });

  }, []);

  // logout (frontend only)
  const handleLogout = () => {

    alert("Logged out successfully");

    navigate("/login");

  };

  return (

    <div className="navbar">

      {/* Logo */}
      <h2 onClick={() => navigate("/home")}>
        Hotel Booking
      </h2>

      {/* Profile */}
      <div className="profile">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          onClick={() => setOpen(!open)}
        />

        {/* Dropdown */}
        {open && (

          <div className="dropdown">

            <p><b>Name:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>

            {/* My Bookings */}
            <button
              className="dropdown-btn"
              onClick={() => {
                navigate("/bookings");
                setOpen(false);
              }}
            >
              My Bookings
            </button>

            {/* Logout */}
            <button onClick={handleLogout}>
              Logout
            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default Navbar;
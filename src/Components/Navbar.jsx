import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const navigate =
    useNavigate();

  // fetch logged in user
  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:8085/api/profile",
          {
            withCredentials: true,
          }
        );

      setUser(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // logout
  const handleLogout =
    async () => {

      try {

        await axios.post(
          "http://localhost:8085/api/logout",
          {},
          {
            withCredentials: true,
          }
        );

        navigate("/login");

      } catch (err) {

        console.log(err);

      }
    };

  return (
    <div className="navbar">

      <h2
        onClick={() =>
          navigate("/home")
        }
      >
        Hotel Booking
      </h2>

      <div className="profile">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          onClick={() =>
            setOpen(!open)
          }
        />

        {open && (

          <div className="dropdown">

            <p>
              <b>Name :</b>{" "}
              {user?.name}
            </p>

            <p>
              <b>Email :</b>{" "}
              {user?.email}
            </p>

            {/* <p>
              <b>Phone :</b>{" "}
              {user?.phone}
            </p> */}

            {/* MY BOOKINGS */}

            <button
              className="dropdown-btn"
              onClick={() => {

                navigate(
                  "/bookings"
                );

                setOpen(false);

              }}
            >
              My Bookings
            </button>

            {/* LOGOUT */}

            <button
              onClick={
                handleLogout
              }
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default Navbar;
// Rooms.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useLocation,
} from "react-router-dom";

import Navbar from "./Navbar";

import "./Rooms.css";

const Rooms = () => {

  const { state } =
    useLocation();

  const hotel =
    state?.hotel;

  const filters =
    state?.filters || {};

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [popup, setPopup] =
    useState(false);

  const [selectedRoom,
    setSelectedRoom] =
    useState(null);

  // fetch rooms
  useEffect(() => {

    fetchRooms();

  }, []);

  const fetchRooms =
    async () => {

      try {

        const body = {

          fromDate:
            filters.fromDate,

          toDate:
            filters.toDate,

          facilities:
            filters.amenities,

          capacity:
            Number(
              filters.people
            ),

          minPrice: 1000,

          maxPrice:
            Number(
              filters.priceRange
            ),

        };

        const res =
          await axios.post(
            `http://localhost:8085/api/${hotel.hotelid}/rooms/search`,
            body
          );

        setRooms(res.data);

        setLoading(false);

      } catch (err) {

        console.log(err);

        setLoading(false);

      }

    };

  // popup
  const openPopup =
    (room) => {

      setSelectedRoom(room);

      setPopup(true);

    };

  // confirm booking
  const confirmBooking =
    async () => {

      try {

        const body = {

          roomid:
            selectedRoom.roomid,

          checkIn:
            filters.fromDate,

          checkOut:
            filters.toDate,

        };

        const res =
          await axios.post(
            "http://localhost:8085/api/book",
            body,
            {
              withCredentials: true,
            }
          );

        alert(
          "Room Booked Successfully"
        );

        setPopup(false);

      } catch (err) {

        console.log(err);

        if (
          err.response?.data
        ) {

          alert(
            err.response.data
          );

        } else {

          alert(
            "Booking Failed"
          );

        }

      }

    };

  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );

  }

  return (

    <div className="rooms-container">

      <Navbar />

      <h2>
        {
          hotel.hotelname
        } Rooms
      </h2>

      {rooms.length === 0 ? (

        <h3>
          No Rooms Available
        </h3>

      ) : (

        rooms.map((room) => (

          <div
            key={room.roomid}
            className="room-card"
          >

            {/* ROOM IMAGE */}

            <div className="room-img">

              <img
                src={
                  room.roomid % 5 === 0
                    ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"
                    : room.roomid % 4 === 0
                    ? "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200"
                    : room.roomid % 3 === 0
                    ? "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200"
                    : room.roomid % 2 === 0
                    ? "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                    : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
                }
                alt="room"
              />

            </div>

            <div className="room-details">

              <h3>

                Room :
                {
                  room.roomnumber
                }

              </h3>

              <p>
                💰 ₹
                {room.price}
              </p>

              <p>
                👥 Capacity :
                {
                  room.capacities
                }
              </p>

              <p>

                {room.availability
                  ? "Available"
                  : "Not Available"}

              </p>

              <div className="amenities">

                {room.facilities.map(
                  (f, i) => (

                    <span key={i}>
                      {f}
                    </span>

                  )
                )}

              </div>

              <button
                onClick={() =>
                  openPopup(room)
                }
              >
                Book Room
              </button>

            </div>

          </div>

        ))
      )}

      {/* popup */}

      {popup &&
        selectedRoom && (

        <div className="popup">

          <div className="popup-box">

            <h3>
              Confirm Booking
            </h3>

            <p>

              <b>
                Hotel :
              </b>

              {
                hotel.hotelname
              }

            </p>

            <p>

              <b>
                Room :
              </b>

              {
                selectedRoom.roomnumber
              }

            </p>

            <p>

              <b>
                Price :
              </b>

              ₹
              {
                selectedRoom.price
              }

            </p>

            <p>

              <b>
                Capacity :
              </b>

              {
                selectedRoom.capacities
              }

            </p>

            <p>

              <b>
                Check In :
              </b>

              {
                filters.fromDate
              }

            </p>

            <p>

              <b>
                Check Out :
              </b>

              {
                filters.toDate
              }

            </p>

            <div className="amenities">

              {selectedRoom.facilities.map(
                (f, i) => (

                  <span key={i}>
                    {f}
                  </span>

                )
              )}

            </div>

            <button
              onClick={
                confirmBooking
              }
            >
              Confirm Booking
            </button>

            <button
              onClick={() =>
                setPopup(false)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default Rooms;
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";

import "./Rooms.css";

// dummy rooms (frontend only)
const dummyRooms = [
  {
    roomid: 1,
    roomnumber: "101",
    price: 2000,
    capacities: 2,
    availability: true,
    facilities: ["wifi", "ac", "tv"],
  },
  {
    roomid: 2,
    roomnumber: "102",
    price: 3000,
    capacities: 3,
    availability: true,
    facilities: ["wifi", "breakfast"],
  },
  {
    roomid: 3,
    roomnumber: "103",
    price: 1500,
    capacities: 2,
    availability: false,
    facilities: ["ac", "tv"],
  },
];

const Rooms = () => {

  const { state } = useLocation();

  const hotel = state?.hotel;

  const filters = state?.filters || {};

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [popup, setPopup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // load rooms (frontend only filter simulation)
  useEffect(() => {

    const filtered = dummyRooms.filter((r) => {

      const priceOk = r.price <= (filters.priceRange || 10000);
      const capacityOk = r.capacities >= (filters.people || 1);

      return priceOk && capacityOk;

    });

    setRooms(filtered);
    setLoading(false);

  }, [filters]);

  // open popup
  const openPopup = (room) => {
    setSelectedRoom(room);
    setPopup(true);
  };

  // confirm booking (frontend only)
  const confirmBooking = () => {

    const newBooking = {
      room: selectedRoom,
      hotel,
      checkIn: filters.fromDate,
      checkOut: filters.toDate,
      status: "BOOKED",
    };

    console.log("Booking Saved (Frontend Only):", newBooking);

    alert("Room Booked Successfully (Frontend Simulation)");

    setPopup(false);

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="rooms-container">

      <Navbar />

      <h2>{hotel?.hotelname} Rooms</h2>

      {rooms.length === 0 ? (
        <h3>No Rooms Available</h3>
      ) : (

        rooms.map((room) => (

          <div key={room.roomid} className="room-card">

            {/* Room Image */}
            <div className="room-img">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
                alt="room"
              />
            </div>

            {/* Details */}
            <div className="room-details">

              <h3>Room: {room.roomnumber}</h3>

              <p>💰 ₹{room.price}</p>

              <p>👥 Capacity: {room.capacities}</p>

              <p>
                {room.availability ? "Available" : "Not Available"}
              </p>

              {/* Facilities */}
              <div className="amenities">

                {room.facilities.map((f, i) => (
                  <span key={i}>{f}</span>
                ))}

              </div>

              <button onClick={() => openPopup(room)}>
                Book Room
              </button>

            </div>

          </div>

        ))

      )}

      {/* Popup */}
      {popup && selectedRoom && (

        <div className="popup">

          <div className="popup-box">

            <h3>Confirm Booking</h3>

            <p><b>Hotel:</b> {hotel?.hotelname}</p>
            <p><b>Room:</b> {selectedRoom.roomnumber}</p>
            <p><b>Price:</b> ₹{selectedRoom.price}</p>
            <p><b>Capacity:</b> {selectedRoom.capacities}</p>
            <p><b>Check In:</b> {filters.fromDate}</p>
            <p><b>Check Out:</b> {filters.toDate}</p>

            <div className="amenities">
              {selectedRoom.facilities.map((f, i) => (
                <span key={i}>{f}</span>
              ))}
            </div>

            <button onClick={confirmBooking}>
              Confirm Booking
            </button>

            <button onClick={() => setPopup(false)}>
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default Rooms;
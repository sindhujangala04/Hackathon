import React, { useState } from "react";

import Navbar from "./Navbar";

import "./Bookings.css";

// dummy bookings (frontend only)
const dummyBookings = [
  {
    bookingid: 1,
    hotel: { hotelname: "Grand Palace", location: "Hyderabad" },
    room: {
      roomnumber: "101",
      capacities: 2,
      price: 2000,
      facilities: ["wifi", "ac", "tv"],
      roomid: 2,
    },
    checkin: "2026-05-10",
    checkout: "2026-05-12",
    status: "BOOKED",
    bookeddate: new Date().toISOString(),
  },
  {
    bookingid: 2,
    hotel: { hotelname: "City Inn", location: "Warangal" },
    room: {
      roomnumber: "205",
      capacities: 3,
      price: 3000,
      facilities: ["wifi", "breakfast"],
      roomid: 3,
    },
    checkin: "2026-05-01",
    checkout: "2026-05-03",
    status: "BOOKED",
    bookeddate: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
];

const Bookings = () => {

  const [bookings, setBookings] = useState(dummyBookings);
  const [loading] = useState(false);

  // check 24 hour cancellation rule
  const canCancelBooking = (bookedDate) => {

    const bookedTime = new Date(bookedDate);
    const now = new Date();

    const diffHours =
      (now - bookedTime) / (1000 * 60 * 60);

    return diffHours <= 24;

  };

  // cancel booking (frontend only)
  const cancelBooking = (id) => {

    const updated = bookings.map((b) =>
      b.bookingid === id
        ? { ...b, status: "CANCELLED" }
        : b
    );

    setBookings(updated);

    alert("Booking Cancelled");

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="bookings-container">

      <Navbar />

      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No Bookings Yet</p>
      ) : (

        <div className="booking-list">

          {bookings.map((b) => (

            <div key={b.bookingid} className="booking-card">

              {/* Image */}
              <div className="booking-img">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
                  alt="room"
                />
              </div>

              {/* Details */}
              <h3>{b.hotel.hotelname}</h3>

              <p>📍 {b.hotel.location}</p>

              <p>🛏 Room: {b.room.roomnumber}</p>

              <p>👥 Capacity: {b.room.capacities}</p>

              <p>💰 Price: ₹{b.room.price}</p>

              <p>📅 Check In: {b.checkin}</p>

              <p>📅 Check Out: {b.checkout}</p>

              <p>📌 Status: {b.status}</p>

              <p>🕒 Booked At: {b.bookeddate}</p>

              {/* Amenities */}
              <div className="amenities">

                {b.room.facilities.map((f, i) => (
                  <span key={i}>{f}</span>
                ))}

              </div>

              {/* Cancel Button */}
              {b.status === "BOOKED" && (

                canCancelBooking(b.bookeddate) ? (

                  <button onClick={() => cancelBooking(b.bookingid)}>
                    Cancel Booking
                  </button>

                ) : (

                  <button disabled>
                    Cancellation Closed
                  </button>

                )

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Bookings;
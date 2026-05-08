// Bookings.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./Bookings.css";

const Bookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // fetch bookings
  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:8085/api/mybookings",
          {
            withCredentials: true,
          }
        );

      setBookings(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }
  };

  // check 24 hrs
  const canCancelBooking = (
    bookedDate
  ) => {

    const bookedTime =
      new Date(bookedDate);

    const now =
      new Date();

    const diffHours =
      (now - bookedTime) /
      (1000 * 60 * 60);

    return diffHours <= 24;
  };

  // cancel booking
  const cancelBooking =
    async (bookingId) => {

      try {

        const res =
          await axios.post(
            `http://localhost:8085/api/cancel/${bookingId}`,
            {},
            {
              withCredentials: true,
            }
          );

        alert(res.data);

        fetchBookings();

      } catch (err) {

        console.log(err);

        alert(
          "Cancel Failed"
        );

      }
    };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (
    <div className="bookings-container">

      <Navbar />

      <h2>
        My Bookings
      </h2>

      {bookings.length === 0 ? (

        <p>
          No Bookings Yet
        </p>

      ) : (

        <div className="booking-list">

          {bookings.map((b) => (

            <div
              key={b.bookingid}
              className="booking-card"
            >

              {/* ROOM IMAGE */}

              <div className="booking-img">

                <img
                  src={
                    b.room?.roomid % 5 === 0
                      ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"
                      : b.room?.roomid % 4 === 0
                      ? "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200"
                      : b.room?.roomid % 3 === 0
                      ? "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200"
                      : b.room?.roomid % 2 === 0
                      ? "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
                  }
                  alt="room"
                />

              </div>

              <h3>
                {
                  b.hotel
                    ?.hotelname
                }
              </h3>

              <p>
                📍
                {
                  b.hotel
                    ?.location
                }
              </p>

              <p>
                🛏 Room :
                {
                  b.room
                    ?.roomnumber
                }
              </p>

              <p>
                👥 Capacity :
                {
                  b.room
                    ?.capacities
                }
              </p>

              <p>
                💰 Price :
                ₹
                {
                  b.room
                    ?.price
                }
              </p>

              <p>
                📅 Check In :
                {b.checkin}
              </p>

              <p>
                📅 Check Out :
                {b.checkout}
              </p>

              <p>
                📌 Status :
                {b.status}
              </p>

              <p>
                🕒 Booked At :
                {b.bookeddate}
              </p>

              {/* amenities */}

              <div className="amenities">

                {b.room?.facilities?.map(
                  (f, i) => (

                    <span key={i}>
                      {f}
                    </span>

                  )
                )}

              </div>

              {/* cancel button */}

              {b.status ===
                "BOOKED" && (

                canCancelBooking(
                  b.bookeddate
                ) ? (

                  <button
                    onClick={() =>
                      cancelBooking(
                        b.bookingid
                      )
                    }
                  >
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
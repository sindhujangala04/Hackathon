import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

import "./Hotel.css";

const amenitiesList = [
  "wifi",
  "ac",
  "tv",
  "pool",
  "breakfast",
];

// dummy hotels (frontend only)
const dummyHotels = [
  {
    hotelid: 1,
    hotelname: "Grand Palace",
    location: "Hyderabad",
    numberofrooms: 20,
    availability: true,
  },
  {
    hotelid: 2,
    hotelname: "City Inn",
    location: "Hyderabad",
    numberofrooms: 15,
    availability: true,
  },
  {
    hotelid: 3,
    hotelname: "Royal Stay",
    location: "Hyderabad",
    numberofrooms: 10,
    availability: false,
  },
];

const Hotel = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const city = state?.city || "";

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // popup
  const [popup, setPopup] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [people, setPeople] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);

  // load hotels (frontend only)
  useEffect(() => {

    const filtered = dummyHotels.filter(
      (h) => h.location === city
    );

    setHotels(filtered);
    setLoading(false);

  }, [city]);

  // open popup
  const openPopup = (hotel) => {
    setSelectedHotel(hotel);
    setPopup(true);
  };

  // toggle amenities
  const toggleAmenity = (amenity) => {

    if (selectedAmenities.includes(amenity)) {

      setSelectedAmenities(
        selectedAmenities.filter((a) => a !== amenity)
      );

    } else {

      setSelectedAmenities([
        ...selectedAmenities,
        amenity,
      ]);

    }

  };

  // apply filters (frontend only validation + navigation)
  const applyFilters = () => {

    if (!fromDate || !toDate || !people) {
      alert("Please fill all fields");
      return;
    }

    if (fromDate > toDate) {
      alert("From Date cannot be greater than To Date");
      return;
    }

    navigate("/rooms", {
      state: {
        hotel: selectedHotel,
        filters: {
          fromDate,
          toDate,
          people,
          amenities: selectedAmenities,
          priceRange,
        },
      },
    });

    setPopup(false);

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="hotel-container">

      <Navbar />

      <h2 className="hotel-title">
        {city} Hotels
      </h2>

      <div className="hotel-list">

        {hotels.length === 0 ? (
          <h3>No Hotels Found</h3>
        ) : (

          hotels.map((hotel) => (

            <div
              key={hotel.hotelid}
              className="hotel-card"
              onClick={() => openPopup(hotel)}
            >

              {/* IMAGE */}
              <div className="hotel-img">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"
                  alt="hotel"
                />
              </div>

              {/* DETAILS */}
              <div className="hotel-details">

                <h3>{hotel.hotelname}</h3>

                <p>📍 {hotel.location}</p>

                <p>🏨 Rooms: {hotel.numberofrooms}</p>

                <p className={hotel.availability ? "available" : "not-available"}>
                  {hotel.availability ? "Available" : "Not Available"}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

      {/* POPUP */}
      {popup && selectedHotel && (

        <div className="popup">

          <div className="popup-box">

            <h3>{selectedHotel.hotelname}</h3>

            {/* Dates */}
            <div className="date-row">

              <div>
                <label>From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div>
                <label>To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

            </div>

            {/* Capacity */}
            <label>Capacity</label>
            <input
              type="number"
              min="1"
              placeholder="Enter Capacity"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />

            {/* Amenities */}
            <label>Amenities</label>

            <div className="amenity-list">

              {amenitiesList.map((amenity) => (

                <label key={amenity} className="amenity-item">

                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />

                  {amenity.toUpperCase()}

                </label>

              ))}

            </div>

            {/* Price */}
            <label>Max Price: ₹{priceRange}</label>

            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />

            {/* Buttons */}
            <div className="popup-buttons">

              <button onClick={applyFilters}>
                Search Rooms
              </button>

              <button
                className="cancel-btn"
                onClick={() => setPopup(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Hotel;
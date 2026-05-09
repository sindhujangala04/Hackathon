import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Navbar from "./Navbar";

import "./Hotel.css";

const amenitiesList = [
  "wifi",
  "ac",
  "tv",
  "pool",
  "breakfast",
];

const Hotel = () => {

  const { state } = useLocation();

  const navigate = useNavigate();

  const city = state?.city || "";

  const [hotels, setHotels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // popup
  const [popup, setPopup] =
    useState(false);

  const [selectedHotel,
    setSelectedHotel] =
    useState(null);

  // filters
  const [fromDate,
    setFromDate] =
    useState("");

  const [toDate,
    setToDate] =
    useState("");

  const [people,
    setPeople] =
    useState("");

  const [selectedAmenities,
    setSelectedAmenities] =
    useState([]);

  const [priceRange,
    setPriceRange] =
    useState(10000);

  // fetch hotels
  useEffect(() => {

    fetchHotels();

  }, [city]);

  const fetchHotels = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8085/api/bylocation?location=${city}`
      );

      setHotels(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }
  };

  // open popup
  const openPopup = (hotel) => {

    setSelectedHotel(hotel);

    setPopup(true);

  };

  // toggle amenities
  const toggleAmenity = (amenity) => {

    if (
      selectedAmenities.includes(
        amenity
      )
    ) {

      setSelectedAmenities(

        selectedAmenities.filter(
          (a) => a !== amenity
        )

      );

    } else {

      setSelectedAmenities([
        ...selectedAmenities,
        amenity,
      ]);

    }
  };

  // apply filters
  const applyFilters = () => {

    if (!fromDate) {

      alert(
        "Please Select From Date"
      );

      return;
    }

    if (!toDate) {

      alert(
        "Please Select To Date"
      );

      return;
    }

    if (!people) {

      alert(
        "Please Enter Capacity"
      );

      return;
    }

    if (fromDate > toDate) {

      alert(
        "From Date cannot be greater than To Date"
      );

      return;
    }

    navigate("/rooms", {

      state: {

        hotel: selectedHotel,

        filters: {

          fromDate,

          toDate,

          people,

          amenities:
            selectedAmenities,

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

          <h3>
            No Hotels Found
          </h3>

        ) : (

          hotels.map((hotel) => (

            <div
              key={hotel.hotelid}
              className="hotel-card"
              onClick={() =>
                openPopup(hotel)
              }
            >

              {/* HOTEL IMAGE */}

              <div className="hotel-img">

                <img
                  src={
                    hotel.hotelid % 5 === 0
                      ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"
                      : hotel.hotelid % 4 === 0
                      ? "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200"
                      : hotel.hotelid % 3 === 0
                      ? "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1200"
                      : hotel.hotelid % 2 === 0
                      ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200"
                      : "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200"
                  }
                  alt="hotel"
                />

              </div>

              {/* details */}

              <div className="hotel-details">

                <h3>
                  {hotel.hotelname}
                </h3>

                <p>
                  📍 {hotel.location}
                </p>

                <p>
                  🏨 Rooms :
                  {hotel.numberofrooms}
                </p>

                <p
                  className={
                    hotel.availability
                      ? "available"
                      : "not-available"
                  }
                >

                  {hotel.availability
                    ? "Available"
                    : "Not Available"}

                </p>

              </div>

            </div>

          ))
        )}

      </div>

      {/* popup */}

      {popup && selectedHotel && (

        <div className="popup">

          <div className="popup-box">

            <h3>

              {selectedHotel.hotelname}

            </h3>

            {/* dates */}

            <div className="date-row">

              <div>

                <label>
                  From Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <label>
                  To Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* capacity */}

            <label>
              Capacity
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter Capacity"
              value={people}
              onChange={(e) =>
                setPeople(
                  e.target.value
                )
              }
            />

            {/* amenities */}

            <label>
              Amenities
            </label>

            <div className="amenity-list">

              {amenitiesList.map(
                (amenity) => (

                  <label
                    key={amenity}
                    className="amenity-item"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedAmenities.includes(
                          amenity
                        )
                      }
                      onChange={() =>
                        toggleAmenity(
                          amenity
                        )
                      }
                    />

                    {amenity.toUpperCase()}

                  </label>

                )
              )}

            </div>

            {/* price */}

            <label>

              Max Price :
              ₹{priceRange}

            </label>

            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) =>
                setPriceRange(
                  e.target.value
                )
              }
            />

            {/* buttons */}

            <div className="popup-buttons">

              <button
                onClick={applyFilters}
              >

                Search Rooms

              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setPopup(false)
                }
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
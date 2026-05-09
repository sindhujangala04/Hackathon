import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import "../Home.css";

const cities = [
  {
    name: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
  },

  {
    name: "Warangal",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=800",
  },

  {
    name: "Suryapeta",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
  },

  {
    name: "Khammam",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800",
  },

  {
    name: "Karimnagar",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
  },
];

const Home = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  // Navigate to hotel page
  const goToHotel = (city) => {

    if (!city) return;

    navigate("/hotel", {
      state: { city },
    });

    setSuggestions([]);
  };

  // Search input
  const handleChange = (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value.trim() !== "") {

      const filtered = cities.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filtered);

    } else {

      setSuggestions([]);

    }
  };

  return (
    <div className="home-container">

      <Navbar />

      {/* Search */}

      <div className="search-wrapper">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={handleChange}
          />

          <button
            onClick={() => goToHotel(search)}
          >
            Search
          </button>

        </div>

        {/* Suggestions */}

        {suggestions.length > 0 && (

          <div className="suggestions">

            {suggestions.map((city, i) => (

              <div
                key={i}
                className="suggestion-item"
                onClick={() =>
                  goToHotel(city.name)
                }
              >

                {city.name}

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Title */}

      <h2 className="title">
        Popular Cities
      </h2>

      {/* Cities */}

      <div className="grid">

        {cities.map((city, i) => (

          <div
            key={i}
            className="card"
            onClick={() =>
              goToHotel(city.name)
            }
          >

            <div
              className="circle"
              style={{
                backgroundImage: `url(${city.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <p>{city.name}</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Home;
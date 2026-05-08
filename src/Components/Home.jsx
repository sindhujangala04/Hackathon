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
      "https://images.unsplash.com/photo-1609921205586-7c2b1b7a8f2a?q=80&w=1200",
  },
  {
    name: "Suryapeta",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
  },
  {
    name: "Khammam",
    image:
      "https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=1200",
  },
  {
    name: "Karimnagar",
    image:
      "https://images.unsplash.com/photo-1621173631175-3b4f4d6a6c5b?q=80&w=1200",
  },
];

const Home = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // navigate to hotel page
  const goToHotel = (city) => {

    if (!city) return;

    navigate("/hotel", {
      state: { city },
    });

    setSearch("");
    setSuggestions([]);

  };

  // handle search input
  const handleChange = (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = cities.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);

  };

  return (

    <div className="home-container">

      {/* Navbar */}
      <Navbar />

      {/* Search Section */}
      <div className="search-wrapper">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={handleChange}
          />

          <button onClick={() => goToHotel(search)}>
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
                onClick={() => goToHotel(city.name)}
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

      {/* City Cards */}
      <div className="grid">

        {cities.map((city, i) => (

          <div
            key={i}
            className="card"
            onClick={() => goToHotel(city.name)}
          >

            <div
              className="circle"
              style={{
                backgroundImage: `url(${city.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <p>{city.name}</p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Home;
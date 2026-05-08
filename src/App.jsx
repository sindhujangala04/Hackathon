<<<<<<< HEAD
import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Hotel from "./components/Hotel";
import Rooms from "./components/Rooms";
import Bookings from "./components/Bookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/hotel",
    element: <Hotel />,
  },

  {
    path: "/rooms",
    element: <Rooms />,
  },

  {
    path: "/bookings",
    element: <Bookings />,
  },
]);

export default function App() {

  return (
    <RouterProvider
      router={router}
    />
  );

}
=======
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 4ca17e1c879761277b14415b50bc0772cf3b73eb

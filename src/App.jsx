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

// ROUTES CONFIGURATION
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

// MAIN APP
export default function App() {
  return <RouterProvider router={router} />;
}
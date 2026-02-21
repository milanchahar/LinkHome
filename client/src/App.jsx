import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListRoom from "./components/ListRoom";
import BrowseRooms from "./components/BrowseRooms";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyListings from "./components/MyListings";
import CustomCursor from "./components/CustomCursor";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <div className="min-h-screen bg-dark-900 border-none">
        <CustomCursor />
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseRooms />} />
          <Route
            path="/list-room"
            element={user ? <ListRoom /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-listings"
            element={user ? <MyListings /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

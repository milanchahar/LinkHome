import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 border-none">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />


        {/* PAGE ROUTES */}
        <Routes>
          {/* THE NEW LANDING PAGE */}
          <Route path="/" element={<Home />} />

          {/* MOVED BROWSE TO ITS OWN PATH */}
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

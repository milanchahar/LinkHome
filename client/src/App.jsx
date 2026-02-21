import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListRoom from "./components/ListRoom";
import BrowseRooms from "./components/BrowseRooms";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyListings from "./components/MyListings";
import CustomCursor from "./components/CustomCursor";
import PropertyView from "./pages/PropertyView";
import EditRoom from "./components/EditRoom";


const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-900 border-none">
      <CustomCursor />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/browse" element={<PageTransition><BrowseRooms /></PageTransition>} />
          <Route path="/property/:id" element={<PageTransition><PropertyView /></PageTransition>} />
          <Route
            path="/list-room"
            element={user ? <PageTransition><ListRoom /></PageTransition> : <Navigate to="/login" />}
          />
          <Route
            path="/my-listings"
            element={user ? <PageTransition><MyListings /></PageTransition> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-room/:id"
            element={user ? <PageTransition><EditRoom /></PageTransition> : <Navigate to="/login" />}
          />

          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


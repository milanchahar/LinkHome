import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import ListRoom from "./components/ListRoom";
import BrowseRooms from "./components/BrowseRooms";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyListings from "./components/MyListings";

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "15px",
  transition: "color 0.3s",
};

const logoutButtonStyle = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "5px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <Toaster position="top-center" reverseOrder={false} />
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 40px",
            backgroundColor: "var(--secondary)",
            color: "white",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "-1px",
            }}
          >
            Home<span style={{ color: "var(--primary)" }}>Link</span>
          </h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/" style={navLinkStyle}>
              Browse
            </Link>
            <Link to="/list-room" style={navLinkStyle}>
              List a Room
            </Link>
            {!user ? (
              <>
                <Link to="/login" style={navLinkStyle}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    ...navLinkStyle,
                    backgroundColor: "var(--primary)",
                    padding: "8px 15px",
                    borderRadius: "8px",
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            )}
          </div>
        </nav>

        <h1
          style={{ textAlign: "center", color: "#2c3e50", marginTop: "20px" }}
        >
          LinkHome
        </h1>

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<BrowseRooms />} />
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
      </div>
    </Router>
  );
}

export default App;

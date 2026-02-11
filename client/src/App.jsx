import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListRoom from "./components/ListRoom";
import BrowseRooms from "./components/BrowseRooms";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.reload();
  };

  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <nav
          style={{
            padding: "15px",
            backgroundColor: "#2c3e50",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Browse Rooms
          </Link>
          <Link
            to="/list-room"
            style={{ color: "white", textDecoration: "none" }}
          >
            List a Room
          </Link>

          
          {!user ? (
            <>
              <Link
                to="/signup"
                style={{ color: "white", textDecoration: "none" }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "orange",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout ({user.name})
            </button>
          )}
        </nav>

        <h1
          style={{ textAlign: "center", color: "#2c3e50", marginTop: "20px" }}
        >
          LinkHome
        </h1>

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<BrowseRooms />} />
            <Route path="/list-room" element={<ListRoom />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

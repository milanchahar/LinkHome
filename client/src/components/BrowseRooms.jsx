import { useEffect, useState } from "react";
import axios from "axios";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:5001/api/listings");
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = vegOnly ? room.isPureVeg : true;
    return matchesSearch && matchesVeg;
  });

  const tagStyle = (color) => ({
    backgroundColor: color + "15",
    color: color,
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    border: `1px solid ${color}`,
  });

  const deleteRoom = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to delete");

    try {
      await axios.delete(`http://localhost:5001/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (err) {
      alert("You are not authorized to delete this listing");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Rooms in India</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search City or Area (e.g. Pune)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            flex: 1,
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          onClick={() => {
            setSearchTerm("");
            setVegOnly(false);
          }}
          style={{
            padding: "10px 15px",
            backgroundColor: "#e67e22",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reset
        </button>
      </div>

      <label
        style={{
          display: "block",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#2c3e50",
        }}
      >
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={(e) => setVegOnly(e.target.checked)}
          style={{ marginRight: "10px" }}
        />
        Show Only Pure Veg
      </label>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "transform 0.3s, boxShadow 0.3s",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              border: "1px solid #f1f5f9",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
            }}
          >
         
            <div style={{ position: "relative" }}>
              <img
                src={
                  room.imageUrl ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={room.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                ₹{room.price}/mo
              </span>
            </div>

            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "var(--secondary)",
                }}
              >
                {room.title}
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
                📍 {room.area}, {room.city}
              </p>

              {room.phoneNumber && (
                <a
                  href={`https://wa.me/91${room.phoneNumber}?text=Hi, I am interested in your room: ${room.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#25D366",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "14px",
                    transition: "background 0.3s"
                  }}
                >
                  Chat on WhatsApp
                </a>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                {room.isPureVeg && (
                  <span style={tagStyle("var(--accent)")}>Pure Veg</span>
                )}
                <span style={tagStyle("#6366f1")}>
                  {room.genderPref || "Any Gender"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredRooms.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          No rooms found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default BrowseRooms;

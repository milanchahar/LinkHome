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
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            {room.imageUrl ? (
              <img
                src={room.imageUrl}
                alt={room.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <p style={{ color: "#999" }}>No Photo Available</p>
              </div>
            )}

            <h3>{room.title}</h3>
            <p>
              <b>Price:</b> ₹{room.price}
            </p>
            <p>
              <b>Location:</b> {room.area}, {room.city}
            </p>

            {room.isPureVeg && (
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Pure Veg
              </span>
            )}

            <div style={{ marginBottom: "10px", marginTop: "10px" }}>
              <span
                style={{
                  backgroundColor:
                    room.genderPref === "Male"
                      ? "#3498db"
                      : room.genderPref === "Female"
                        ? "#e91e63"
                        : "#9b59b6",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {room.genderPref || "Any"}
              </span>
            </div>

            <button
              onClick={() =>
                alert(
                  `Full Address: ${room.address}\n\nDescription: ${room.description}`,
                )
              }
              style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "#2c3e50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              View Full Details
            </button>
            {user && Number(user.id) === Number(room.ownerId) && (
              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => deleteRoom(room.id)}
                  style={{
                    color: "#e74c3c",
                    border: "1px solid #e74c3c",
                    background: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Delete My Listing
                </button>
              </div>
            )}
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

import { useEffect, useState } from "react";
import axios from "axios";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:5001/api/listings");
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(
    (room) =>
      room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.area.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

      <input
        type="text"
        placeholder="Search City or Area (e.g. Pune)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

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
            }}
          >
            <h3>{room.title}</h3>
            <p>
              <b>Price:</b> ₹{room.price}
            </p>
            <p>
              <b>Location:</b> {room.area}, {room.city}
            </p>
            {room.isPureVeg && (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Pure Veg
              </span>
            )}
            {user && user.id === room.ownerId && (
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

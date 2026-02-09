import { useEffect, useState } from "react";
import axios from "axios";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:5001/api/listings");
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Rooms in India</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {rooms.map((room) => (
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
                🌱 Pure Veg
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRooms;

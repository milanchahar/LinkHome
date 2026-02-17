import { useEffect, useState } from "react";
import axios from "axios";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [genderFilter, setGenderFilter] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(50000);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/listings");
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      (room.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.area || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = vegOnly ? room.isPureVeg : true;
    const matchesGender =
      genderFilter === "Any" ? true : room.genderPref === genderFilter;
    const matchesPrice = Number(room.price) <= maxPrice;
    return matchesSearch && matchesVeg && matchesGender && matchesPrice;
  });

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
          borderRadius: "24px",
          color: "white",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          marginBottom: "40px",
        }}
      >
        <h1>
          Find Your Perfect <span style={{ color: "#60a5fa" }}>Home</span>
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        <input
          placeholder="Search City/Area..."
          style={{
            flex: 2,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <option value="Any">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div style={{ flex: 1, minWidth: "150px" }}>
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            style={{ width: "100%" }}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: "600",
          }}
        >
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
          />{" "}
          Veg
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ height: "200px", backgroundColor: "#f1f5f9" }}>
              {room.imageUrl && (
                <img
                  src={room.imageUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div style={{ padding: "20px" }}>
              <h3>{room.title}</h3>
              <p>
                📍 {room.area}, {room.city}
              </p>
              <h4 style={{ color: "var(--primary)" }}>₹{room.price}/mo</h4>
              <a
                href={`https://wa.me/91${room.phoneNumber}`}
                target="_blank"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor: "#25D366",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "10px",
                  fontWeight: "700",
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRooms;

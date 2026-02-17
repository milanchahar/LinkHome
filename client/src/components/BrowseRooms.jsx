import { useEffect, useState } from "react";
import axios from "axios";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/listings");
        setRooms(res.data);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchRooms();
  }, []);

  const tagStyle = (color) => ({
    backgroundColor: color + "15",
    color: color,
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    border: `1px solid ${color}`,
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.area?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = vegOnly ? room.isPureVeg : true;
    return matchesSearch && matchesVeg;
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
        <h1 style={{ fontSize: "40px", fontWeight: "700", margin: 0 }}>
          Find Your Perfect <span style={{ color: "#60a5fa" }}>Home</span>
        </h1>
        <p style={{ opacity: 0.8, marginTop: "10px" }}>
          Pure Veg and Gender-specific rooms across India.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        <input
          placeholder="Search Pune, Mumbai..."
          style={{ flex: 1, border: "none", outline: "none", padding: "10px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: "600",
            color: "var(--secondary)",
          }}
        >
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
          />{" "}
          Pure Veg
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
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "200px",
                backgroundColor: "#f1f5f9",
              }}
            >
              {room.imageUrl ? (
                <img
                  src={room.imageUrl}
                  alt={room.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  🏠 No Image Added
                </div>
              )}
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ margin: 0 }}>{room.title}</h3>
              <p style={{ color: "#64748b", margin: "5px 0" }}>
                📍{room.area}, {room.city}
              </p>
              <h4 style={{ color: "var(--primary)", margin: "10px 0" }}>
                ₹{room.price}/mo
              </h4>

              {room.phoneNumber && (
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
                  Chat on WhatsApp 💬
                </a>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {room.isPureVeg && (
                  <span style={tagStyle("var(--accent)")}>Pure Veg</span>
                )}
                <span style={tagStyle("#6366f1")}>{room.genderPref}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseRooms;

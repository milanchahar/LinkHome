import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    area: "",
    price: "",
    isPureVeg: false,
    genderPref: "Any",
    imageUrl: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5001/api/listings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Room Listed Successfully! 🏠");
      navigate("/");
    } catch (err) {
      toast.error("Failed to list room. check if you are logged in.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ color: "var(--secondary)", textAlign: "center" }}>
        List Your Property
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="text"
          placeholder="Title (e.g. Cozy 1BHK)"
          required
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="City"
            required
            style={inputStyle}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Area"
            required
            style={inputStyle}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
        </div>
        <input
          type="number"
          placeholder="Monthly Rent (₹)"
          required
          style={inputStyle}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL (Optional)"
          style={inputStyle}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="WhatsApp Number (Optional)"
          style={inputStyle}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "600",
          }}
        >
          <input
            type="checkbox"
            onChange={(e) =>
              setFormData({ ...formData, isPureVeg: e.target.checked })
            }
          />{" "}
          Pure Veg Property
        </label>

        <button
          type="submit"
          style={{
            padding: "15px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Post Listing Now
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontFamily: "Poppins",
};

export default ListRoom;

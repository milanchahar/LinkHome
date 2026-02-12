import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const ListRoom = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    address: "",
    imageUrl: "",
    isPureVeg: true,
    genderPref: "Any",
    lifestyle: "Professional",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "homelink_preset");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqs5rvi8b/image/upload",
        data,
      );
      setFormData((prev) => ({ ...prev, imageUrl: res.data.secure_url }));
      toast.success("Image uploaded! 📸");
    } catch (err) {
      toast.error("Upload failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return toast.error("Please upload a photo first!");

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5001/api/listings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Room listed successfully!");
    } catch (err) {
      toast.error("Failed to post listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>List My Room (India)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="area"
          placeholder="Area"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label
          style={{ fontWeight: "bold", display: "block", marginTop: "10px" }}
        >
          Room Photo:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ margin: "10px 0" }}
        />

        {formData.imageUrl && (
          <div style={{ marginBottom: "10px" }}>
            <img
              src={formData.imageUrl}
              alt="Preview"
              style={{
                width: "100px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <p style={{ fontSize: "12px", color: "green" }}>✓ Image Ready</p>
          </div>
        )}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "15px 0",
            color: "green",
            fontWeight: "bold",
          }}
        >
          <input
            name="isPureVeg"
            type="checkbox"
            checked={formData.isPureVeg}
            onChange={handleChange}
          />
          Pure Veg Kitchen 🌱
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            background: loading ? "#ccc" : "#2c3e50",
            color: "white",
            width: "100%",
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Processing..." : "Submit Listing"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default ListRoom;

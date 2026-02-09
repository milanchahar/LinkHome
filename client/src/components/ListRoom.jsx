import { useState } from "react";
import axios from "axios";

const ListRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    address: "",
    imageUrl: "",
    genderPref: "Any",
    lifestyle: "Early Bird",
    isPureVeg: true, // Defaulting to Yes for Indian context
    hasWifi: false,
    hasAC: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to your Node.js server
      const response = await axios.post(
        "http://localhost:5001/api/listings",
        formData,
      );
      alert("Success! Room listed in " + response.data.city);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to post listing. Check terminal.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
      }}
    >
      <h2>List My Room (India)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <input
          name="city"
          placeholder="City (e.g. Pune)"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <input
          name="area"
          placeholder="Area (e.g. Lohegaon)"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0" }}
        />

        <div>
          <label>Gender Preference: </label>
          <select name="genderPref" onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div style={{ margin: "10px 0" }}>
          <input
            name="isPureVeg"
            type="checkbox"
            checked={formData.isPureVeg}
            onChange={handleChange}
          />
          <label> Pure Vegetarian House</label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
          }}
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListRoom;

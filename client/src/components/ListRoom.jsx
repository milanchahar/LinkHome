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
    isPureVeg: true,
    genderPref: "Any",
    lifestyle: "Professional",
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
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5001/api/listings", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Listing created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error: You must be logged in to post a listing.");
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

        {/* Simplified Selectors to match your state logic */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "15px 0",
            cursor: "pointer",
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
          This is a Pure Veg Kitchen
        </label>

        <label
          style={{ display: "block", marginTop: "10px", fontWeight: "bold" }}
        >
          Who can stay here?
        </label>
        <select
          name="genderPref"
          value={formData.genderPref}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <option value="Any">Any Gender</option>
          <option value="Male">Male Only</option>
          <option value="Female">Female Only</option>
        </select>

        <label style={{ display: "block", fontWeight: "bold" }}>
          Environment:
        </label>
        <select
          name="lifestyle"
          value={formData.lifestyle}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <option value="Professional">Professional</option>
          <option value="Quiet/Studious">Quiet/Studious</option>
          <option value="Social/Friendly">Social/Friendly</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListRoom;

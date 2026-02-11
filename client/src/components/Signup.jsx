import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/signup", formData);
      alert("Signup successful! Now you can login.");
    } catch (err) {
      alert("Error during signup");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", maxWidth: "400px" }}
    >
      <h2>Create LinkHome Account</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

const axios = require('axios');
const jwt = require('jsonwebtoken');

async function testApi() {

  try {
    const email = `testuser_${Date.now()}@example.com`;
    console.log("Signing up as", email);

    const signupRes = await axios.post("https://linkhome.onrender.com/api/auth/signup", {
      email,
      password: "password123",
      name: "Test User"
    });

    const token = signupRes.data.token;
    console.log("Got token!", typeof token);

    const listingRes = await axios.get("https://linkhome.onrender.com/api/listings/22");
    const ownerId = listingRes.data.ownerId;
    console.log("Target partnerId is:", ownerId);

    const convRes = await axios.post("https://linkhome.onrender.com/api/conversations",
      { partnerId: ownerId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("SUCCESS! Conversation created/returned:", convRes.data.id);
  } catch (err) {
    if (err.response) {
      console.error("API failed with:", err.response.status, err.response.data);
    } else {
      console.error("Unknown error:", err.message);
    }
  }
}

testApi();

const axios = require('axios');
const jwt = require('jsonwebtoken');

async function test() {
  const token = jwt.sign({ userId: 6 }, "default_secret", { expiresIn: "10h" });
  try {
    const { data: conv } = await axios.post("http://localhost:5001/api/conversations", { partnerId: 6 }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Conversation:", conv);
  } catch (e) {
    console.error("Error creating conv:", e.response?.data || e.message);
  }
}
test();

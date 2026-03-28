async function testApi() {
  try {
    const email = `testuser_${Date.now()}@example.com`;
    console.log("Signing up as", email);

    const signupRes = await fetch("https://linkhome.onrender.com/api/auth/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: "password123", name: "Test User" })
    });

    const signupData = await signupRes.json();
    const token = signupData.token;
    console.log("Got token!", typeof token);

    const listingRes = await fetch("https://linkhome.onrender.com/api/listings/22");
    const listingData = await listingRes.json();
    const ownerId = listingData.ownerId;
    console.log("Target partnerId is:", ownerId);

    const convRes = await fetch("https://linkhome.onrender.com/api/conversations", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ partnerId: ownerId })
    });

    if (convRes.ok) {
      const convData = await convRes.json();
      console.log("SUCCESS! Conversation created/returned:", convData.id);
    } else {
      const errText = await convRes.text();
      console.log("SERVER RETURNED HTTP STATUS:", convRes.status, errText);
    }
  } catch (err) {
    console.error("Unknown error:", err.message);
  }
}

testApi();

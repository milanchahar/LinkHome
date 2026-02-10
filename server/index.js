require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ message: "LinkHome Server is live!" });
});

app.post("/api/listings", async (req, res) => {
  // 1. Destructure all fields from the request body
  const {
    title,
    description,
    price,
    city,
    area,
    address,
    imageUrl,
    isPureVeg,
    genderPref,
    lifestyle,
  } = req.body;

  try {
    // 2. Use Prisma to save to MySQL
    const newListing = await prisma.listing.create({
      data: {
        ownerId: 1, // We will make this dynamic when we build Login
        title,
        description,
        price: Number(price), // Converts the text from the form into a Number
        city,
        area,
        address,
        imageUrl,
        isPureVeg,
        genderPref,
        lifestyle,
        availableFrom: "Immediate",
      },
    });

    // 3. Send success response back to React
    res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create listing" });
  }
});

app.get("/api/listings", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc", 
      },
    });
    res.json(listings); 
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});
app.delete("/api/listings/:id", async (req, res) => {
  try {
    await prisma.listing.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const prisma = new PrismaClient();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Please login first" });

  jwt.verify(token, "milan_secret_key", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "LinkHome Server is live!" });
});

app.post("/api/listings", authenticateToken, async (req, res) => {
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
    const newListing = await prisma.listing.create({
      data: {
        ownerId: req.user.userId, 
        title,
        description,
        price: Number(price),
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
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: "Failed to create listing" });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Scramble it!

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone },
    });
    res.json({ message: "User created!", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate a token valid for 24 hours
    const token = jwt.sign({ userId: user.id }, "milan_secret_key", {
      expiresIn: "24h",
    });
    res.json({ token, user: { id: user.id, name: user.name } });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
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
app.delete("/api/listings/:id", authenticateToken, async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) return res.status(404).json({ error: "Listing not found" });
    if (listing.ownerId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own listings!" });
    }

    await prisma.listing.delete({ where: { id: listingId } });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));

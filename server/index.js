require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Please login first" });

  const secret = process.env.JWT_SECRET || "milan_secret_key";
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    res.json({ message: "User created!", userId: user.id });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Email already exists", message: "Email already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const secret = process.env.JWT_SECRET || "milan_secret_key";
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: "24h",
    });
    res.json({ token, user: { id: user.id, name: user.name } });
  } else {
    res.status(401).json({
      error: "Invalid email or password",
      message: "Invalid email or password",
    });
  }
});

app.get("/api/listings", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

app.get("/api/listings/:id", async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

app.post("/api/listings", authenticateToken, async (req, res) => {
  console.log("POST /api/listings body:", JSON.stringify(req.body, null, 2));
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
    phoneNumber,
  } = req.body;
  try {
    const newListing = await prisma.listing.create({
      data: {
        ownerId: req.user.userId,
        title,
        description: req.body.description || "test listing",
        price: Number(price),
        city,
        area,
        address,
        imageUrl: imageUrl || null,
        images: req.body.images || [],
        isPureVeg: isPureVeg === true,
        genderPref: genderPref || "Any",
        lifestyle: lifestyle || "Any",
        phoneNumber: phoneNumber || null,
        availableFrom: "Immediate",
        hasWifi: req.body.hasWifi === true,
        hasParking: req.body.hasParking === true,
        hasGym: req.body.hasGym === true,
        hasPool: req.body.hasPool === true,
        hasAC: req.body.hasAC === true,
        hasLaundry: req.body.hasLaundry === true,
        hasBalcony: req.body.hasBalcony === true,
        isFurnished: req.body.isFurnished === true,
      },
    });
    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res
      .status(500)
      .json({ error: "Failed to create listing", detail: error.message });
  }
});

app.delete("/api/listings/:id", authenticateToken, async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    if (listing.ownerId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await prisma.listing.delete({ where: { id: listingId } });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/listings/:id", authenticateToken, async (req, res) => {
  console.log("PUT /api/listings/:id body:", JSON.stringify(req.body, null, 2));
  try {
    const listingId = parseInt(req.params.id);
    const {
      title,
      description,
      price,
      city,
      area,
      imageUrl,
      isPureVeg,
      genderPref,
    } = req.body;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) return res.status(404).json({ error: "Not found" });
    if (listing.ownerId !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: {
        title,
        description: req.body.description || "",
        city,
        area,
        address: req.body.address || "",
        imageUrl,
        images: req.body.images || [],
        price: Number(price),
        isPureVeg: isPureVeg === true,
        genderPref: genderPref || "Any",
        hasWifi: req.body.hasWifi === true,
        hasParking: req.body.hasParking === true,
        hasGym: req.body.hasGym === true,
        hasPool: req.body.hasPool === true,
        hasAC: req.body.hasAC === true,
        hasLaundry: req.body.hasLaundry === true,
        hasBalcony: req.body.hasBalcony === true,
        isFurnished: req.body.isFurnished === true,
        phoneNumber: req.body.phoneNumber || null,
      },
    });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update listing", detail: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const prisma = new PrismaClient();

// Improved logging for debugging server exits
process.on("exit", (code) => {
  console.log(`Process is exiting with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION at:", promise, "reason:", reason);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down...");
  process.exit(0);
});

const compression = require("compression");
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

    // Strip large fields from the payload to reduce network transfer size
    const optimizedListings = listings.map(listing => {
      let firstImage = null;
      if (listing.images && Array.isArray(listing.images) && listing.images.length > 0) {
        firstImage = listing.images[0];
      }

      const optimized = {
        ...listing,
        images: firstImage ? [firstImage] : [],
      };
      delete optimized.description;
      return optimized;
    });

    res.json(optimizedListings);
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

app.get("/", (req, res) => {
  res.send("LINKHOME BACKEND LIVE");
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

const PORT = process.env.PORT || 5001;

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Please kill the process using it or choose a different port.`);
      process.exit(1);
    } else {
      console.error("Server error:", error);
      process.exit(1);
    }
  });

  // Keep-alive heartbeat (optional, but helpful for debugging)
  setInterval(() => {
    if (process.env.DEBUG_HEARTBEAT) {
      console.log("Heartbeat: Server is still alive");
    }
  }, 60000).unref();
}

module.exports = app;

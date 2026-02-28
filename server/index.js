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
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const sortBy = req.query.sortBy;

    let orderBy = { createdAt: "desc" };
    if (sortBy === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sortBy === "price_asc") {
      orderBy = { price: "asc" };
    }

    const listings = await prisma.listing.findMany({
      take: limit,
      orderBy,
      select: {
        id: true,
        ownerId: true,
        title: true,
        price: true,
        city: true,
        area: true,
        address: true,
        imageUrl: true,
        isPureVeg: true,
        genderPref: true,
        lifestyle: true,
        availableFrom: true,
        hasWifi: true,
        isFurnished: true,
        hasParking: true,
        hasGym: true,
        hasPool: true,
        hasAC: true,
        hasLaundry: true,
        hasBalcony: true,
        createdAt: true,
        images: true,
      }
    });

    const optimizedListings = listings.map(listing => {
      let firstImage = null;
      if (listing.images && Array.isArray(listing.images) && listing.images.length > 0) {
        firstImage = listing.images[0];
      }

      return {
        ...listing,
        images: firstImage ? [firstImage] : [],
      };
    });

    res.json(optimizedListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
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

app.get("/api/conversations", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        participants: {
          select: { id: true, name: true, email: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

app.post("/api/conversations", authenticateToken, async (req, res) => {
  try {
    const { partnerId } = req.body;
    const userId = req.user.userId;

    if (!partnerId) {
      return res.status(400).json({ error: "partnerId is required" });
    }

    if (userId === partnerId) {
      return res.status(400).json({ error: "Cannot create conversation with yourself" });
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: userId } } },
          { participants: { some: { id: partnerId } } },
        ],
      },
      include: {
        participants: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (existingConversation) {
      return res.json(existingConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: userId }, { id: partnerId }],
        },
      },
      include: {
        participants: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

app.get("/api/messages/:conversationId", authenticateToken, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.conversationId);
    const userId = req.user.userId;

    // Verify user is part of the conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(p => p.id === userId);
    if (!isParticipant) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post("/api/messages", authenticateToken, async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user.userId;

    if (!conversationId || !content) {
      return res.status(400).json({ error: "conversationId and content are required" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(conversationId) },
      include: { participants: true },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(p => p.id === senderId);
    if (!isParticipant) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId: Number(conversationId),
      },
      include: {
        sender: {
          select: { id: true, name: true },
        },
      },
    });

    await prisma.conversation.update({
      where: { id: Number(conversationId) },
      data: { updatedAt: new Date() },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
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

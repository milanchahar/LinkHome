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

const PORT = 5001;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));

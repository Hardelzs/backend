const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const authRoutes = require("../routes/auth");
const reportsRoutes = require("../routes/report"); // ✅ make sure the filename matches exactly!

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportsRoutes);

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);

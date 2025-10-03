const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("../routes/auth");
const coursesRoutes = require("../routes/courses");
const reportsRoutes = require("../routes/reports");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/reports", reportsRoutes);

module.exports = app;
module.exports.handler = serverless(app);

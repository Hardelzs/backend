const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const authRoutes = require("../routes/auth");
const reportsRoutes = require("../routes/report"); // check spelling: "report.js" not "reports.js"

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportsRoutes);

// Export as a serverless function
module.exports = app;
module.exports.handler = serverless(app);

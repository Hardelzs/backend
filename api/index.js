const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// import your existing routes
const authRoutes = require("../routes/auth");
const coursesRoutes = require("../routes/courses");
const reportsRoutes = require("../routes/reports");

// mount them
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/reports", reportsRoutes);

// export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

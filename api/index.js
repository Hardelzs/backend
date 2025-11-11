const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes (point to top-level routes folder)
const authRoutes = require("../routes/auth");
const courseRoutes = require("../routes/courses");
const reportRoutes = require("../routes/reports");
const loginRoutes = require("../routes/login");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/login", loginRoutes);

// Default
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});


module.exports = app;

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);

module.exports = app; // ✅ important for Vercel

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Import your routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const reportRoutes = require('./routes/report');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;

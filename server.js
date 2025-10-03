
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} already in use. Try: PORT=5002 npm run dev`);
    process.exit(1);
  }
});

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const loginRoutes = require('./routes/login');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/login', loginRoutes);

module.exports = app; // ✅ important for Vercel

// If this file is run directly (e.g. `node server.js` or via nodemon), start the
// HTTP server. When required by a platform like Vercel, the app is exported and
// the platform will handle listening.
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
}

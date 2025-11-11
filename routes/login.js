const express = require('express');
const router = express.Router();

// zsample.
const SAMPLE_EMAIL = 'maliapugh@radiant-flow.org';
const SAMPLE_PASSWORD = 'Aa123456';

// POST / - accepts { email, password } and returns the clubs JSON structure
router.post('/', (req, res) => {
	const { email, password } = req.body || {};

	if (!email || !password) {
		return res.status(400).json({ error: 'Missing email or password' });
	}

	// Basic check against the sample credentials. In a real app.
	if (email !== SAMPLE_EMAIL || password !== SAMPLE_PASSWORD) {
		return res.status(401).json({ error: 'Invalid credentials' });
	}

	// json syructure
	const response = {
		clubs: [
			{
				club_id: '123',
				club_name: 'Royal Poker',
				tables: [
					{
						table_id: 'T01',
						table_name: 'No Limit 1',
						players: [
							{
								player_id: 'P001',
								player_name: 'John',
								status: 'active',
								chip_count: 2500,
							},
						],
					},
				],
			},
		],
	};

	res.json(response);
});

module.exports = router;


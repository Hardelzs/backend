const express = require('express');
const router = express.Router();
const { dbAsync } = require('../db');

// Create a course and assign it to a lecturer
router.post('/', async (req, res) => {
  const { faculty, course_name, course_code, lecturer_id } = req.body;
  try {
    const info = await dbAsync.run(
      `INSERT INTO courses (faculty, course_name, course_code, lecturer_id) VALUES (?,?,?,?)`,
      [faculty, course_name, course_code, lecturer_id]
    );
    const course = await dbAsync.get('SELECT * FROM courses WHERE id = ?', [info.lastInsertRowid]);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all courses
router.get('/', async (req, res) => {
  try {
    const rows = await dbAsync.all(
      `SELECT c.*, u.name as lecturer_name, u.email as lecturer_email
       FROM courses c
       LEFT JOIN users u ON c.lecturer_id = u.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

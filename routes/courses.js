const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a course and assign it to a lecturer
router.post('/', (req, res) => {
  const { faculty, course_name, course_code, lecturer_id } = req.body;
  try {
    const info = db.prepare(
      `INSERT INTO courses (faculty, course_name, course_code, lecturer_id) VALUES (?,?,?,?)`
    ).run(faculty, course_name, course_code, lecturer_id);
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(info.lastInsertRowid);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all courses
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(
      `SELECT c.*, u.name as lecturer_name, u.email as lecturer_email
       FROM courses c
       LEFT JOIN users u ON c.lecturer_id = u.id`
    ).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

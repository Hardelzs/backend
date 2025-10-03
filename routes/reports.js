const express = require('express');
const router = express.Router();
const db = require('../db');

// Create report
router.post('/', (req, res) => {
  const r = req.body;

  try {
    const info = db.prepare(`
      INSERT INTO reports 
      (course_id, week, date, class_name, students_present, total_students, venue, time, topic, outcomes, recommendations)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `).run(
      r.course_id || null,
      r.week,
      r.date,
      r.class_name,
      r.students_present || 0,
      r.total_students || 0,
      r.venue,
      r.time,
      r.topic,
      r.outcomes,
      r.recommendations
    );

    // Get the inserted report back
    const row = db.prepare('SELECT * FROM reports WHERE id = ?').get(info.lastInsertRowid);

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all reports
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT r.*, c.course_name, c.course_code 
      FROM reports r 
      LEFT JOIN courses c ON r.course_id = c.id
    `).all();
    
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add feedback to a report
router.post('/:id/feedback', (req, res) => {
  const id = req.params.id;
  const { feedback } = req.body;

  try {
    db.prepare('UPDATE reports SET feedback = ? WHERE id = ?').run(feedback, id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../data/db'); // تأكد أنك عندك هذا الاستيراد صح

// POST message - إدخال رسالة في قاعدة البيانات
router.post('/contacts', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = 'INSERT INTO contacts (fullname, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [name, email, phone || null, message], (err, result) => {
    if (err) {
      console.error('DB Insert error:', err);
      return res.status(500).json({ message: 'Failed to save message' });
    }
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// GET messages - جلب جميع الرسائل من قاعدة البيانات
router.get('/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB Select error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});

module.exports = router;

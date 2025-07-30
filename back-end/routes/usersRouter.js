const express = require("express")
const router = express.Router()
const db = require('../data/db')
const bcrypt = require('bcrypt');






router.get('/users', (req, res) => {
  const sql = 'SELECT id, fullname, email, phone, role, status, created_at FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});






router.get('/users/details', (req, res) => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.fullname,
      u.email,
      u.phone,
      COUNT(r.id) AS rentalCount,
      MAX(r.return_date) AS lastRentalDate,
      COALESCE(SUM(r.total_amount), 0) AS totalSpent,
      u.status
    FROM users u
    LEFT JOIN rentals r ON u.id = r.user_id
    GROUP BY u.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'DB error' });
    }
     console.log('totalSpent types:', results.map(r => typeof r.totalSpent), results.map(r => r.totalSpent));
    res.json(results);
  });
});

router.get('/users/stats', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalUsers,
      SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS activeUsers,
      SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) AS inactiveUsers,
      SUM(CASE WHEN status = 'banned' THEN 1 ELSE 0 END) AS bannedUsers
    FROM users
    WHERE role = 'client';
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json(results[0]);
  });
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { fullname, email, address, password, phone, role, status } = req.body;

  try {
    let cryptpassword = undefined;

    if (password) {
      cryptpassword = await bcrypt.hash(password, 10); // صححت هنا، كنت كتعلن const مرتين
    }

    const sql = cryptpassword
      ? `UPDATE users SET fullname = ?, email = ?, address = ?, password = ?, phone = ?, role = ?, status = ? WHERE id = ?`
      : `UPDATE users SET fullname = ?, email = ?, address = ?, phone = ?, role = ?, status = ? WHERE id = ?`;

    const params = cryptpassword
      ? [fullname, email, address, cryptpassword, phone, role, status, id]
      : [fullname, email, address, phone, role, status, id];

    db.query(sql, params, (err, result) => {
      if (err) {
    console.error('Update user error:', err); // هنا اللوج اللي خاص تشوفه فالسيرفر
    return res.status(500).json({ error: err.message });
  }
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/users/ban/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'UPDATE users SET status = ? WHERE id = ?';

  db.query(sql, ['banned', userId], (err, result) => {
    if (err) {
      console.error('Error banning user:', err);
      return res.status(500).json({ message: 'Error banning user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User banned successfully' });
  });
});















// GET user by ID
router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

  console.log('Fetching user with id:', id);

  const sql = 'SELECT id, fullname, email, phone, role, status, created_at FROM users WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error in SELECT query:', err); // <=== هنا غادي يبان الخطأ في terminal
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  });
});







router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});















module.exports= router
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













// GET user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, fullname, email, phone, role, status, created_at FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
});








router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { fullname, email, address, password, phone, role, status } = req.body;

  try {
    let cryptpassword = undefined;

    if (password) {
   
      
      const cryptpassword = await  bcrypt.hash( password, 10)
    }

    
    const sql = cryptpassword
      ? `UPDATE users SET fullname = ?, email = ?, address = ?, password = ?, phone = ?, role = ?, status = ? WHERE id = ?`
      : `UPDATE users SET fullname = ?, email = ?, address = ?, phone = ?, role = ?, status = ? WHERE id = ?`;

   
    const params = cryptpassword
      ? [fullname, email, address, cryptpassword, phone, role, status, id]
      : [fullname, email, address, phone, role, status, id];

    db.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
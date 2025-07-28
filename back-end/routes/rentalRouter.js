const express = require("express")
const router = express.Router()
const db = require('../data/db')






router.get('/rentals', (req, res) => {
    const sql = `
    SELECT
      r.id AS rental_id,
      u.fullname AS customer,
      CONCAT(c.brand, ' ', c.model) AS vehicle,
      DATEDIFF(IFNULL(r.return_date, CURDATE()), r.rental_date) AS duration_days,
      r.total_amount,
      r.status
    FROM rentals r
    JOIN users u ON r.user_id = u.id
    JOIN cars c ON r.car_id = c.id
    ORDER BY r.rental_date DESC
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching rentals:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        results.forEach(r => {
            r.total_amount = parseFloat(r.total_amount) || 0;
        });
        res.json(results);
    });
});



router.get('/rentals/details', (req, res) => {
  const sql = `
    SELECT 
  r.id AS rental_id,
  u.fullname AS customer_name,
  c.brand AS vehicle_brand,
  c.model AS vehicle_model,
  r.rental_date,
  r.return_date,
  r.total_amount AS amount,
  r.status
FROM rentals r
JOIN users u ON r.user_id = u.id
JOIN cars c ON r.car_id = c.id
ORDER BY r.id DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});


router.get('/rentals/stats', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE status = 'active') AS activeCustomers,
      (SELECT COUNT(*) FROM rentals WHERE status = 'Active') AS activeRentals,
      (SELECT COALESCE(SUM(total_amount), 0) FROM rentals) AS totalRevenue,
      (SELECT COALESCE(SUM(total_amount)/COUNT(DISTINCT user_id), 0) FROM rentals) AS avgRevenuePerCustomer
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB stats error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results[0]);
  });
});





router.get('/rentals/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM rentals WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Rental not found' });
        res.json(results[0]);
    });
});




// POST /rental/rentals
router.post('/rentals', (req, res) => {
  const { user_id, car_id, rental_date, return_date, total_amount, status } = req.body;

  if (!user_id || !car_id || !rental_date || !return_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const getUserQuery = 'SELECT fullname FROM users WHERE id = ?';
  db.query(getUserQuery, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const full_name = results[0].fullname;

    // مثلاً كتستعمل full_name فشي حاجة هنا أو كتسجله ف rental لو بغيت

    const insertQuery = `
      INSERT INTO rentals (user_id, car_id, rental_date, return_date, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [user_id, car_id, rental_date, return_date, total_amount || 0, status || 'ongoing'], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({ message: "Rental added", rentalId: result.insertId });
    });
  });
});







router.put('/rentals/:id', (req, res) => {
    const id = req.params.id;
    const { user_id, car_id, rental_date, return_date, total_amount, status } = req.body;
    const query = `
    UPDATE rentals 
    SET user_id = ?, car_id = ?, rental_date = ?, return_date = ?, total_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

    db.query(query, [user_id, car_id, rental_date, return_date, total_amount, status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
        res.json({ message: 'Rental updated' });
    });
});




router.delete('/rentals/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM rentals WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
        res.json({ message: 'Rental deleted' });
    });
});



module.exports = router
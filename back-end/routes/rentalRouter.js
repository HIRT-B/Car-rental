const express = require("express");
const router = express.Router();
const db = require('../data/db');

// GET all rentals summary
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
      if (r.status) r.status = r.status.trim(); // trim spaces if any
    });
    res.json(results);
  });
});

// GET detailed rentals
router.get('/rentals/details', (req, res) => {
  const sql = `
    SELECT 
      r.id AS rental_id,
      r.user_id,
      r.car_id,
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
    ORDER BY r.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    results.forEach(r => {
      if (r.status) r.status = r.status.trim();
    });
    res.json(results);
  });
});

// GET rental stats
router.get('/rentals/stats', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE status = 'active') AS activeCustomers,
      (SELECT COUNT(*) FROM rentals WHERE LOWER(status) = 'Active') AS activeRentals,
      (SELECT COUNT(*) FROM rentals WHERE status = 'Completed') AS completedRentals,
      (SELECT COUNT(*) FROM rentals WHERE status = 'In process') AS inProcessRentals,
      (SELECT COUNT(*) FROM rentals WHERE status = 'Canceled') AS cancelledRentals
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

// في ملف routes/rentalRoutes.js أو وين كتخدم
router.get('/rentals/today', (req, res) => {
  const sql = "SELECT COUNT(*) AS todayCount FROM rentals WHERE DATE(rental_date) = CURDATE()";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error fetching today's rentals:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ todayCount: results[0].todayCount });
  });
});


// POST add rental
router.post('/rentals', (req, res) => {
  const { user_id, car_id, rental_date, return_date, status } = req.body;

  if (!user_id || !car_id || !rental_date || !return_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Get car price
  const carQuery = 'SELECT price FROM cars WHERE id = ?';
  db.query(carQuery, [car_id], (err, carRes) => {
    if (err) return res.status(500).json({ error: err });
    if (carRes.length === 0) return res.status(404).json({ error: "Car not found" });

    const dailyPrice = parseFloat(carRes[0].price) || 0;

    // Calculate days difference
    const daysSql = 'SELECT GREATEST(DATEDIFF(?, ?), 1) AS days';
    db.query(daysSql, [return_date, rental_date], (err, daysRes) => {
      if (err) return res.status(500).json({ error: err });

      const days = daysRes[0].days;
      const total_amount = (dailyPrice * days).toFixed(2);

      // Insert rental
      const insertQuery = `
        INSERT INTO rentals (user_id, car_id, rental_date, return_date, total_amount, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [user_id, car_id, rental_date, return_date, total_amount, status || 'Active'],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });
          res.status(201).json({ message: "Rental added", rentalId: result.insertId });
        }
      );
    });
  });
});

// PUT update rental status
router.put('/rentals/:id', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const query = `UPDATE rentals SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

  db.query(query, [status.trim(), id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
    res.json({ message: `Rental status updated to ${status}` });
  });
});

// DELETE rental
router.delete('/rentals/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM rentals WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
    res.json({ message: 'Rental deleted' });
  });
});

module.exports = router;

const express = require("express")
const router = express.Router()
const db = require('../data/db')
const bcrypt = require('bcrypt')





// Route to register a new user
router.post('/register', async (req, res) => {
  const { fullname, email, address, password, phone } = req.body;

  if (!fullname || !email || !address || !password || !phone) {
    return res.status(400).json({ message: 'Invalid request. Please check your input.' });
  }

  try {
    const cryptpassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (fullname, email, address, password, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fullname, email, address, cryptpassword, phone], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server error while accessing the database.' });
      }
      return res.status(200).json({ message: 'Data has been saved successfully.' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'An unexpected error occurred.', error: error.message });
  }
});




// Route to login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid request. Please check your input.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error while accessing the database.' });
        }

        //if (results.length === 0) {
            // res.status(401).json({ message: 'Invalid email or password.' });
       // }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({
            message: 'Login successful',
            id: user.id,
            role: user.role,
            fullname: user.fullname,
            email: user.email
        });
    });
});



module.exports = router
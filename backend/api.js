// api.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db'); // Assuming db.js handles MySQL connection

// Registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (firstName, lastName, mobileNumber, password, createdDate, updatedDate) VALUES (?, ?, ?, ?, NOW(), NOW())';
  db.query(query, [firstName, lastName, mobileNumber, hashedPassword], (err, result) => {
    if (err) throw err;
    res.status(201).send('User registered');
  });
});

// Login
router.post('/login', (req, res) => {
  const { mobileNumber, password } = req.body;
  const query = 'SELECT * FROM users WHERE mobileNumber = ?';
  db.query(query, [mobileNumber], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.send(`Good ${getGreeting()}, Mr. ${user.firstName} ${user.lastName}`);
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

module.exports = router;

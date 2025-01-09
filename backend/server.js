const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (firstName, lastName, mobileNumber, password, createdDate, updatedDate) VALUES (?, ?, ?, ?, NOW(), NOW())';
  db.query(query, [firstName, lastName, mobileNumber, hashedPassword], (err, result) => {
    if (err) throw err;
    res.status(201).send('User registered');
  });
});

app.post('/login', (req, res) => {
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

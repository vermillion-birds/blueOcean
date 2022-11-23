require('dotenv').config();
const express = require('express');
const util = require('node:util');

const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');
const { getBirdNames, postBird, getGeoLocFromAddress } = require('./controllers/birds.js');
const {
  addUser, getUser, getUserEmail, updateUser,
} = require('./controllers/users.js');

// middlewar e
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/birds', getBirdNames);

// returns the route for a confirmed user
app.get('/user', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// returns the route to create a new user form
app.get('/createUser', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// returns the route for the bird list
app.get('/birdList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.post('/location', getGeoLocFromAddress);
const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

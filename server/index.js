require('dotenv').config();
const express = require('express');
const util = require('node:util');

const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');
const { getBirdNames, postBird } = require('./controllers/birds.js');
const { addUser, getUser } = require('./controllers/users.js');

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
  console.log('in user get user');
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// returns the route for the bird list
app.get('/birdList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// posts new user information to the DB
// app.post('/addUser', (req, res) => {
//   console.log('IN ADDING USER ROUTE', req.body);
//   res.send('sterno2510@gmail.com');
// });
app.post('/addUser', addUser);
app.get('/userInfo', getUser);

// gets user information from DB with current user's email
// app.get('/userInfo', ((req, res) => {
//   console.log('in user get userinfo');
//   res.send('user');
// }));

const PORT = process.env.PORT || 3001;

app.post('/birds', postBird);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

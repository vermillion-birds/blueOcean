require('dotenv').config();
const express = require('express');
const util = require('node:util');

const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');
const { getBirdNames, postBird } = require('./controllers/birds.js');
const {
  addUser, getUser, getUserEmail, updateUser, getUserID, getAllUsers,
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

// posts new user to db
app.post('/addUser', addUser);
// confirms user email exists in db
app.get('/userInfo', getUserEmail);
// get's user information to be updated
app.get('/getUser', getUser);
// update's user information
app.put('/updateUser', updateUser);
// get userID based on email
app.get('/userID', getUserID);
// get all users
app.get('/allUsers', getAllUsers);

const PORT = process.env.PORT || 3001;

app.post('/birds', postBird);

app.get('/birdCards/:user_id', ((req, res) => {
  console.log(req.params);
  res.send('hitting sever from get birdcards');
}))

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

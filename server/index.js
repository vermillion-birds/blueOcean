require('dotenv').config();
const express = require('express');
const util = require('node:util');
// image upload
let cloudinary = require('cloudinary').v2;
require('body-parser');

const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');
const { getBirdNames, postBird, getGeoLocFromAddress, getBirdCards} = require('./controllers/birds.js');
const {
  addUser, getUser, getUserEmail, updateUser, getUserID, getAllUsers, getFriendList, addFriend
} = require('./controllers/users.js');
const {getMessages, sendMessage, getConversationId } = require('./controllers/messages.js')

// middlewar e
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// testing image upload endpoint
app.get("/testing", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});
// testing image upload endpoint
app.post("/image-upload", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  }
  // upload image here
  cloudinary.uploader.upload(data.image)
  .then((result) => {
    response.status(200).send({
      message: "success",
      result,
    });
  }).catch((error) => {
    response.status(500).send({
      message: "failure",
      error,
    });
  });
});


app.get('/birds', getBirdNames);

// returns the route for a confirmed user
app.get('/user', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// returns the route for friends list
app.get('/friendsList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

// returns the route to create a new user form
app.get('/createUser', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.get('/birdCards/:user_id', getBirdCards);
// returns the route for the bird list
app.get('/birdList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.post('/location', getGeoLocFromAddress);


app.get('/birdCards/:user_id', getBirdCards);

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
// get a list of friends for one user
app.get('/friendsList/:user_id', getFriendList);
// get chatId (chat room)
// app.get('/chatId/:chatIdString', getChatId);


// get messages with a conv id or create one if doesn't exist
app.get('/chatId/:chatIdString', getMessages);

app.post('/birds', postBird);

app.post('/friends', addFriend);

// post chats inside the db
app.post(`/chatId/sendMessage`, sendMessage);

app.get('/chatId/:chatIdString/getConversationId');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

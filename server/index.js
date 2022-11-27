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
const { getBirdNames, postBird } = require('./controllers/birds.js');

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

app.get('/user', ((req, res) => {
  console.log('in user get user');
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.get('/userInfo', ((req, res) => {
  console.log('in user get userinfo');
  res.send('user');
}));

app.get('/createUser', ((req, res) => {
  console.log('in user get user');
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

const PORT = process.env.PORT || 3001;

app.post('/birds', postBird);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

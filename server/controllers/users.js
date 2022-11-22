/* eslint-disable import/extensions */
const axios = require('axios');
const { postUser, getEmail } = require('../../database/models/Users.js');

const addUser = (req, res) => {
  postUser(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  getEmail(req.query)
    .then((data) => {
      res.send(data.rows);
    });
};

module.exports = {
  addUser, getUser,
};

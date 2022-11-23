/* eslint-disable import/extensions */
const axios = require('axios');
const {
  postUser, getEmail, getOneUser, updateOneUser,
} = require('../../database/models/Users.js');

const addUser = (req, res) => {
  postUser(req.body)
    .then((response) => {
      console.log('RESPONSE IN ADDUSER', response);
      res.send(response);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end('error in add user');
    });
};

const getUserEmail = (req, res) => {
  getEmail(req.query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  getOneUser(req.query)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  updateOneUser(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addUser, getUser, getUserEmail, updateUser,
};

const { pool } = require('../db.js');

pool.connect();

const postUser = (req) => {
  const withProfilePicture = `INSERT INTO users (first_name, last_name, username, email, profile_url, user_location) VALUES ('${req.firstName}', '${req.lastName}', '${req.userName}', '${req.email}', '${req.profilePicture}', ${req.zipCode} ) RETURNING email;`;

  const withoutProfilePicture = `INSERT INTO users (first_name, last_name, username, email, user_location) VALUES ('${req.firstName}', '${req.lastName}', '${req.userName}', '${req.email}', ${req.zipCode} ) RETURNING email;`;

  let postQuery = '';
  if (req.profilePicture.length === 0) {
    postQuery = withoutProfilePicture;
  } else {
    postQuery = withProfilePicture;
  }

  return pool.query(postQuery);
};

const getEmail = (req) => pool.query(`SELECT email from USERS WHERE email='${req.email}';`);

const getOneUser = (req) => pool.query(`SELECT * FROM users WHERE email='${req.email}';`);

const getOneUserID = (req) => pool.query(`SELECT user_id FROM users WHERE email ='${req.email}';`);

const getUsers = () => pool.query('SELECT * FROM users');

const getFriends = (user_id) => pool.query(`SELECT json_agg(friend_user_id) AS Friendship FROM FRIENDSHIPS WHERE logged_in_user_id = ${user_id}`)

// const updateOneUser = (req) =>

module.exports = {
  postUser, getEmail, getOneUser, getOneUserID, getUsers, getFriends,
};

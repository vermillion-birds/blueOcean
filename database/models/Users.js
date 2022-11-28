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

const getFriends = (user_id) => pool.query(`
  with frdsArray AS (
  SELECT array_agg(friend_user_id) AS arr FROM friendships WHERE logged_in_user_id = ${user_id})

  SELECT array_agg(
    json_build_object (
      'friend_user_id', user_id,
      'first_name', first_name,
      'last_name', last_name,
      'username',username,
      'profile_url', profile_url
    )
  ) AS Friends
  FROM users
  WHERE user_id = ANY (SELECT unnest(arr) FROM frdsArray)`);

const updateOneUser = (req) => {
  for (column in req) {
    if (column !== 'user_id') {
      if (column !== 'user_location') {
        pool.query(`UPDATE users SET ${column} = '${req[column]}' WHERE user_id = ${req.user_id}`);
      } else {
        pool.query(`UPDATE users SET ${column} = ${req[column]} WHERE user_id = ${req.user_id}`);
      }
    }
  }
};

const postFriend = (req) => pool.query(
  `INSERT INTO friendships (logged_in_user_id, friend_user_id) VALUES (${req.userID}, ${req.friend});
  INSERT INTO friendships (logged_in_user_id, friend_user_id) VALUES (${req.friend}, ${req.userID});`
);

module.exports = {
  postUser, getEmail, getOneUser, getOneUserID, getUsers, getFriends, updateOneUser, postFriend,
};

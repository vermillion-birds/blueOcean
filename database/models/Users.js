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

  return pool.query(postQuery)
    .then((data) => (data))
    .catch((err) => {
      console.log(err);
    });
};

const getEmail = (req) => pool.query(`SELECT email from USERS WHERE email='blah.com';`);

module.exports = {
  postUser, getEmail,
};

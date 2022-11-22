const { pool } = require('../db.js');

const getBirds = () => pool.connect()
  .then((client) => {
    console.log('CONNECTING TO POSTGRES POOL CLIENT');
    return client.query('SELECT * FROM birds')
      .then((res) => {
        client.release();
        console.log('RETREIVING FROM DATABASE');
        return res.rows;
      })
      .catch((err) => {
        client.release();
        console.log('getBirds FROM DB ERROR ', err);
      });
  })
  .catch((err) => console.log('getBirds FROM DB ERROR ', err));

const postBirds = () => {

};

module.exports = {
  getBirds,
};

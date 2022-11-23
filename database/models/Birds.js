const {pool} = require('../db.js');

const getBirds = () => {
  return pool.connect()
    .then(client => {
      console.log('CONNECTING TO POSTGRES POOL CLIENT');
      return client.query('SELECT * FROM birds')
      .then((res) => {
        client.release();
        console.log('RETREIVING FROM DATABASE');
        return res.rows;
      })
      .catch(err => {
        client.release();
        console.log('getBirds FROM DB ERROR ', err)
      })
    })
    .catch(err =>  console.log('getBirds FROM DB ERROR ', err))
}


const createABird = () => {
// create a row in Birds, return bird_id
};
const createBirdSighting = () => {
// create row in Bird_User and in Bird_Photo
};

const postUser = () => {

};

module.exports = {
  getBirds,
  createABird,
  createBirdSighting
}
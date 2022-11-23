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


const createABird = (birdObj) => {
// create a row in Birds, return bird_id
  return pool.query(`
    INSERT INTO birds (bird_common_name, scentific_name)
    VALUES (${birdObj.commonName}, ${birdObj.sciName})
    RETURNING bird_id
  `)
};
const createBirdSighting = (birdObj) => {
// create row in Bird_User and in Bird_Photo
  return pool.query(`
    WITH insertBU AS (
    INSERT INTO bird_user(bird_id, user_id, note, first_seen, last_seen)
    VALUES (${birdObj.bird_id}, ${birdObj.user_id}, ${birdObj.notes}, ${birdObj.dateSeen}, ${birdObj.dateSeen})
    ),
    INSERT INTO bird_photos(photo_url, user_id, bird_id, location_lat, location_lon, date)
    VALUES (${birdObj.url}, ${birdObj.user_id}, ${birdObj.bird_id}, ${birdObj.lat}, ${birdObj.lon}, ${birdObj.dateSeen})
  )`)
};

const postUser = () => {

};

module.exports = {
  getBirds,
  createABird,
  createBirdSighting
}
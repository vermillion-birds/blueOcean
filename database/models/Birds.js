const { pool } = require('../db.js');

/*
return [] all bird card info for a user_id
user_id = 1
[{
  common_name:
  scentific_name:
  summary:
  note:
  first_seen:
  last_seen:
  count:
  bird_photos:[url, url,...]
  location:[{lat: ,lng: }, [], ...]
},{},...]
const getAllBirdCardInfo
*/
// with birdsArray AS (
//     SELECT array_agg(bird_id) AS arr FROM bird_user WHERE user_id = ${user_id}
//   )

//   SELECT array_agg(
//     json_build_object (
//       'user_id', ${user_id},
//       'bird_id', birds.bird_id,
//       'common_name',birds.bird_common_name,
//       'scentific_name',birds.scentific_name,
//       'summary', birds.summary,
//       'first_seen', bird_user.first_seen,
//       'last_seen', bird_user.last_seen,
//       'note', bird_user.note,
//       'count', bird_user.count,
//       'bird_photos', (SELECT json_agg(bird_photos.photo_url) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id),
//       'bird_location', (SELECT json_agg(
//         json_build_object(
//           'lat', bird_photos.location_lat,
//           'lng', bird_photos.location_lon
//         )) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id)
//     )
//   ) AS birdCardInfo
//   FROM birds
//   JOIN bird_user
//   ON birds.bird_id = bird_user.bird_id
//   WHERE birds.bird_id = ANY (SELECT unnest(arr) FROM birdsArray)
//   GROUP BY bird_user.user_id
//   LIMIT 1

const getAllBirdCardInfo = (user_id) => {
  // console.log('QUERYING WITH USER ID ', user_id)
  return pool.query(`
  with birdsArray AS (
    SELECT array_agg(bird_id) AS arr FROM bird_user WHERE user_id = ${user_id}
  )
  SELECT array_agg(
    json_build_object (
      'user_id', ${user_id},
      'bird_id', birds.bird_id,
      'common_name',birds.bird_common_name,
      'scentific_name',birds.scentific_name,
      'summary', birds.summary,
      'first_seen', (SELECT bird_user.first_seen FROM bird_user WHERE bird_user.user_id = ${user_id} AND bird_user.bird_id = birds.bird_id),
      'last_seen', (SELECT bird_user.last_seen FROM bird_user WHERE bird_user.user_id = ${user_id} AND bird_user.bird_id = birds.bird_id),
      'count', (SELECT bird_user.count FROM bird_user WHERE bird_user.user_id = ${user_id} AND bird_user.bird_id = birds.bird_id),
      'note', (SELECT bird_user.note FROM bird_user WHERE bird_user.user_id = ${user_id} AND bird_user.bird_id = birds.bird_id),
      'bird_photos', (SELECT json_agg(bird_photos.photo_url) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id),
      'bird_location', (SELECT json_agg(
        json_build_object(
          'lat', bird_photos.location_lat,
          'lng', bird_photos.location_lon
        )) FROM bird_photos WHERE bird_photos.bird_id = birds.bird_id)
    )
  ) AS birdCardInfo
  FROM birds
  WHERE birds.bird_id = ANY (SELECT unnest(arr) FROM birdsArray)`
  )
}


const getBirds = () => {
  return pool.connect()
    .then(client => {
      // console.log('CONNECTING TO POSTGRES POOL CLIENT');
      return client.query('SELECT * FROM birds')
      .then((res) => {
        client.release();
        // console.log('RETREIVING FROM DATABASE');
        return res.rows;
      })
      .catch((err) => {
        client.release();
        console.log('getBirds FROM DB ERROR ', err);
      });
  })
  .catch((err) => console.log('getBirds FROM DB ERROR ', err));
}

const createABird = (birdObj) => {
  // console.log('object in creat a bird', birdObj);
// create a row in Birds, return bird_id
  return pool.query(`
    INSERT INTO birds (bird_common_name, scentific_name, summary)
    VALUES ('${birdObj.commonName}', '${birdObj.sciName}', '${birdObj.summary}')
    RETURNING bird_id
  `)
};
const createBirdSighting = (birdObj) => {
  // console.log('object in creat a bird sighting ', birdObj);
// create row in Bird_User and in Bird_Photo
  return pool.query(`
    WITH insertBU AS (
    INSERT INTO bird_user(bird_id, user_id, note, first_seen, last_seen)
    VALUES (${birdObj.bird_id}, ${birdObj.user_id}, '${birdObj.notes}', '${birdObj.dateSeen}', '${birdObj.dateSeen}')
    )
    INSERT INTO bird_photos(user_id, bird_id, location_lat, location_lon, date)
    VALUES (${birdObj.user_id}, ${birdObj.bird_id}, ${birdObj.lat}, ${birdObj.lon}, '${birdObj.dateSeen}')
  `)
};

module.exports = {
  getBirds,
  createABird,
  createBirdSighting,
  getAllBirdCardInfo
}

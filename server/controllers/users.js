const axios = require('axios');
require("dotenv").config();
// const { postUser } = require('../../database/models/Birds.js');

const createNewUser = async (req, res) => {
  let zipCode = req.body.zip; //check name of what client is sending

  try {
    getUserGeoLocFromZip(zipCode);
  } catch (err) {
    console.log(err, 'error in createNewUser');
  }
}



const getUserGeoLocFromZip = async (zip) => {
  const encodedZip = encodeURI(zip);
  // console.log(encodedZip, 'encoded zip');
  const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedZip}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const fullLocationData = await axios.get(googleURL);
    const geoLocation = {};
    // console.log('location obj', fullLocationData.data.results[0].geometry);
    geoLocation.lat = fullLocationData.data.results[0].geometry.location.lat;
    geoLocation.lng = fullLocationData.data.results[0].geometry.location.lng;
    console.log(geoLocation)
    // return geoLocation;
  } catch (err) {
    console.log('error inside getUserGeoLocFromZip', err);
  }

}

module.exports = {
  createNewUser
}

//show current location https://developers.google.com/maps/documentation/javascript/geolocation










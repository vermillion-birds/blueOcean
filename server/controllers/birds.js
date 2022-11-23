const axios = require('axios');
require("dotenv").config();
const parseString = require('xml2js').parseString;
const {
  getBirds,
  createABird,
  createBirdSighting,
  getAllBirdCardInfo
} = require('../../database/models/Birds.js');

const getBirdNames = (req, res) => {
  console.log('REQUEST RECEIVED');
  getBirds().then((names) => {

    console.log(names);
    res.send(names);
  })
}

const getBirdCards = (req, res) => {
  console.log('TESTING GET ALL BIRD CARD INFO')
  const user_id = parseInt(req.params.user_id);
  getAllBirdCardInfo(user_id).then((data) => {
    console.log(data.rows[0].birdcardinfo);
    res.send(data.rows[0].birdcardinfo)
  })
}


// bird address validation: https://developers.google.com/maps/documentation/address-validation/requests-validate-address  get location in geocode
// requests will be sent to https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

// animalData[0]['ax21:anyMatchList'].map(i => i['ax21:sciName'])[1][0]
// animalData[0]["ax21:anyMatchList"].map(i => i["ax21:commonNameList"]).flat().map(i =>i["ax21:commonNames"]).flat().map(i => i['ax21:commonName']).flat()


const getGeoLocFromAddress = async (req, res) => {
  let addressString = req.body.address.split(' ').join('%20');
  let googleURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=${addressString}&inputtype=textquery&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    let response = await axios.get(googleURL);
    let formattedAddress = response.data.candidates;
    res.send(formattedAddress);
  } catch (err) {
    console.log('there is an error in getGeoLocfromAddress', err);
    res.status(404);
  }
};

const getScientificName = async (nameAttempt) => {
  let taxinomicUrl = `http://www.itis.gov/ITISWebService/services/ITISService/searchForAnyMatch`;
  const response = await axios.get(taxinomicUrl, {
    params: {
      srchKey: nameAttempt
    }
  });
  return new Promise((resolve, reject) => {
    const nameResults = {};
    parseString(response.data, function (err, parsedResult) {
      const indexOfMostRelevantEntry = 1;
      const indexOfFallBackEntry = 0;
      const results = parsedResult['ns:searchForAnyMatchResponse']['ns:return'][0];
      const RESULT_SET_KEY = 'ax21:anyMatchList';
      if (results[RESULT_SET_KEY]) {

        const animalData = results[RESULT_SET_KEY][indexOfMostRelevantEntry] || results[RESULT_SET_KEY][indexOfFallBackEntry];
        nameResults.sciName = animalData['ax21:sciName'][0]
        nameResults.commonName = animalData['ax21:commonNameList'][0]["ax21:commonNames"][0]['ax21:commonName'][0]
        resolve(nameResults);
      } else {
        reject('no results found')
      }
    });
  })
}

const getWikiSummary = async (scientificName) => {
  let queryName = scientificName.split(' ').join('_');
  const summary = await axios({
    method: 'get',
    url: `https://en.wikipedia.org/api/rest_v1/page/summary/${queryName}`
  })
  return summary.data.extract;
}

const postBird = async (req, res) => {

  let bodyName = req.body.commonName;
  const { lat, lng } = req.body.location; //requires that location is an object with lat and lng properties
  const notes = req.body.notes; // user notes
  const dateSeen = req.body.dateSeen;
  const userId = req.body.user_id;
  const url = req.body.url;
  const birdObj = {
    notes: notes,
    dateSeen: dateSeen,
    url: url,
    user_id: userId,
    lat: lat,
    lon: lng
  };
  try {
    if (!req.body.bird_id) {
      const { sciName } = await getScientificName(bodyName);
      const summary = await getWikiSummary(sciName);
      birdObj.sciName = sciName;
      birdObj.summary = summary;
      birdObj.commonName = bodyName;
      const birdId = await createABird(birdObj);
      birdObj.bird_id= birdId;
    }
    await createBirdSighting(birdObj)
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err);
  }
}



module.exports = {
  getBirdNames,
  postBird,
  getGeoLocFromAddress,
  getBirdCards
}


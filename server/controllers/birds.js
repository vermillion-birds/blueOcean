const axios = require('axios');
const parseString = require('xml2js').parseString;
const { getBirds } = require('../../database/models/Birds.js');

const getBirdNames = (req, res) => {
  console.log('REQUEST RECEIVED');
  getBirds().then((names) => {

    console.log(names);
    res.send(names);
  })
}


// animalData[0]['ax21:anyMatchList'].map(i => i['ax21:sciName'])[1][0]
// animalData[0]["ax21:anyMatchList"].map(i => i["ax21:commonNameList"]).flat().map(i =>i["ax21:commonNames"]).flat().map(i => i['ax21:commonName']).flat()
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
  let nameAttempt = req.body.commonName;
  try {
    const { sciName, commonName } = await getScientificName(nameAttempt);
    const summary = await getWikiSummary(sciName);
    console.log(summary)
  } catch (err) {
    console.log(err)
  }
}



module.exports = {
  getBirdNames,
  postBird
}


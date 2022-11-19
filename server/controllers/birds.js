const {getBirds} = require('../../database/models/Birds.js');

exports.getBirdNames = (req, res) => {
  console.log('REQUEST RECEIVED');
  getBirds().then((names) => {

    console.log(names);
    res.send(names);
  })
}
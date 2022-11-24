const {getAllMessages} = require('../../database/models/Messages.js');

const getMessages = (req, res) => {
  console.log(req.params.chatIdString);
  getAllMessages(req.params.chatIdString)
  .then(data => {
    console.log(data.rows);
    if (data.rows[0]){
      res.send(data.rows[0].chats);
    } else {
      res.send([]);
    }

  })
  .catch(err => console.log('ERROR IN GETMESSAGES ', err))

}

module.exports={
  getMessages
}
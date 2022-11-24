const {getAllMessages} = require('../../database/models/Messages.js');

const getMessages = (req, res) => {
  console.log(req.params.chatIdString);
  getAllMessages(req.params.chatIdString)
  .then(data => {
    res.send(data.rows[0].chats);
  })
  .catch(err => console.log('ERROR IN GETMESSAGES ', err))

}

module.exports={
  getMessages
}
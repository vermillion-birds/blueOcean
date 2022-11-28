const {getAllMessages, insertMessage} = require('../../database/models/Messages.js');

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

const sendMessage = (req, res) => {
  console.log('type of timestamp', req.body);
  insertMessage({
    message: req.body.message,
    timestamp: req.body.timestamp,
    sender_id: req.body.currentUser,
    conversation_id: req.body.conversationId
  })
    .then((response) => {
      res.send(response)
    })
}

module.exports={
  getMessages,
  sendMessage
}
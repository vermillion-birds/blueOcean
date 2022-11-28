const {getAllMessages, insertMessage} = require('../../database/models/Messages.js');

const getMessages = (req, res) => {
  // console.log(req.params.chatIdString);
  getAllMessages(req.params.chatIdString)
  .then(data => {
    if (data.rows[0]){
      res.send(data.rows[0].chats);
    } else {
      res.send([]);
    }

  })
  .catch(err => console.log('ERROR IN GETMESSAGES ', err))

}

const sendMessage = (req, res) => {
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

const getConversationId = function (req, res) {
  console.log('New params for convId', req.params)
}

module.exports={
  getMessages,
  sendMessage,
  getConversationId
}
const { pool } = require('../db.js');

const getAllMessages = (users_hash) => {
  // users_hash = users_hash.split('&');
  console.log(users_hash);
  return pool.query(`
  with tryInsert AS (
	  INSERT INTO conversations (users_hash)
	  VALUES ('${users_hash}')
      ON CONFLICT (users_hash)
      Do Nothing
      ),
   getConvId AS (
      SELECT  conv_id AS conversation FROM conversations WHERE users_hash = '${users_hash}'
  )

  SELECT json_agg(
  	json_build_object(
		'message', messages.message,
		'timestamp', messages.timestamp,
    'conversation_id', messages.conversation_id,
		'sender_name', (SELECT first_name || ' ' || last_name AS full_name FROM users WHERE users.user_id = messages.sender_id)
	)
	ORDER BY timestamp
  ) AS chats
  FROM messages
  WHERE conversation_id = (SELECT conversation FROM getConvId)
  GROUP BY conversation_id
  `)
  .catch(err => console.log(err));
}

const insertMessage = (incomingMsg) => {
  return pool.query (
    `WITH getConvId AS (
      SELECT  conv_id AS conversation FROM conversations WHERE users_hash = '${incomingMsg.conversation_id}'
  )
    INSERT INTO messages (message, timestamp, sender_id, conversation_id)
  VALUES ('${incomingMsg.message}', '${incomingMsg.timestamp}', ${incomingMsg.sender_id},
  (SELECT conversation FROM getConvId ))`)
  .catch(err => console.log(err));
}

module.exports ={
  getAllMessages,
  insertMessage
}
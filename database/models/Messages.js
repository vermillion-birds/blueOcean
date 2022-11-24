const { pool } = require('../db.js');

const getAllMessages = (users_hash) => {
  users_hash = users_hash.split('&');
  console.log(users_hash);
  return pool.query(`
  with getConvId AS (
    SELECT  conv_id AS conversation FROM conversations WHERE users_hash = ${users_hash[0]}::varchar(255)||'&'||${users_hash[1]}::varchar(255)
  )
  SELECT json_agg(
  	json_build_object(
		'message', messages.message,
		'timestamp', messages.timestamp,
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

module.exports ={
  getAllMessages,
}
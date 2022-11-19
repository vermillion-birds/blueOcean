const { Pool } = require('pg')

const dotenv = require('dotenv');

dotenv.config();

//  create a new pool with configuration:

const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})


// This block is connecting with our connection string so that we can finally begin to persist data in PostgreSQL using Node.js

// // ==> Connect to db
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// pool.on('connect', () => {
//   console.log('connecting db success!');
// });


// https://www.postgresql.org/docs/9.1/libpq-envars.html
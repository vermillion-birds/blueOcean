const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const {Pool, Client} = require('pg');

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
};

const pool = new Pool(config);
console.log('CONNECTED TO POSTGRES');

module.exports = {
  pool
}

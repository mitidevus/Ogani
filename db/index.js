// get the client
const mysql = require('mysql2/promise');

const db = { connection: null };

require("dotenv").config();

(async () => {
  // create the connection to database
  db.connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  console.log('Database connected!');
})();

module.exports = db;
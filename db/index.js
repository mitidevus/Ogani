// get the client
const mysql = require('mysql2/promise');

const db = { connection: null };

// require("dotenv").config();

(async () => {
  // create the connection to database
  db.connection = await mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b0970366aef1fb",
    password: "ed5e0c83",
    database:"heroku_4932217c006f01d"
  });
  console.log('Database connected!');
})();

module.exports = db;
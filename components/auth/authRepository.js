const db = require('../../db');
exports.emailExists = async (email) => {
  const result = await db.connection.execute('select email from user where email = ? limit 1', [email]);
  return result[0].length > 0;
};

/**
 * Return the user info with specify email, otherwise null
 * @param email
 * @returns {Promise<object|null>}
 */
exports.getUserByEmail = async (email) => {
  const result = await db.connection.execute('select * from users where email = ? limit 1', [email]);
  return result[0] && result[0][0];
};


exports.insertUser = async (fullName, email, password) => {
  await db.connection.execute('INSERT INTO `Users` (`fullname`, `email`, `address`, `password`) VALUES (?,?,?)', [email, password, fullName]);
};
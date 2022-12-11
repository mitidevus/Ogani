const bcrypt = require('bcryptjs');

const authRepository = require('./authRepository');

exports.register = async (fullname, email, address, password) => {
  if (await authRepository.emailExists(email))
    throw new Error('Email exists!');
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return authRepository.insertUser(fullname, email, address,hash);
}

/**
 * Check user credential and return the user info, otherwise null
 * @param email
 * @param password
 * @returns {Promise<Object|null>}
 */
exports.checkUserCredential = async (email, password) => {
  const user = await authRepository.getUserByEmail(email);
  //console.log("fullname= "+user.fullname)
  if (!user) return null;

  // let tam=await bcrypt.compare(password, user.password)
  // console.log(tam)

  //let tam = (password===user.password)

  if (password===user.password)
  {
    return user;
  }
  
  return null;
}

const createError = require('http-errors');
const qs = require('qs');

exports.login = async (req, res) => {
  res.render('login/page')
};

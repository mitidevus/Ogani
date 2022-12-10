
const createError = require('http-errors');
const qs = require('qs');

exports.account = async (req, res) => {
  res.render('account/page')
};

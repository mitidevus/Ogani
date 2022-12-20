const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const authService = require('./authService');
const registerSchema = require('./schemas/register');

const ajv = new Ajv();
addFormats(ajv);

exports.showRegistrationForm = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  // syntax validation
  if (!ajv.validate(registerSchema, req.body)) {
    res.render('auth/register', { error: 'Invalid input!' });
    return;
  }

  const { fullname, email, address, password, re_password } = req.body;

  if (password !== re_password) {
    res.render('auth/register', { error: 'Password does not match!' });
    return;
  }

  try {
    await authService.register(fullname, email, address, password);

    const user = await authService.getUserByEmail(email);
    console.log("user: ", user);
    if (!user) {
      console.log("user null");
      return;
    }

    req.login(user, function (err) {
      if (err) { 
        return next(err);
      }
      return res.redirect('/');
    });
  } catch (e) {
    res.render('auth/register', { error: e.message }); //kt mail có dùng để đăng ký hay chưa
    return;
  }
};

exports.showLoginForm = (req, res) => {
  res.render('auth/login');
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
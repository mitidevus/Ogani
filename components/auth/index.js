const express = require('express');
const router = express.Router();

const authController = require('./authController');
const passport = require('./passport');

router.get('/register', authController.showRegistrationForm);
router.post('/register', authController.register);

router.get('/login', authController.showLoginForm);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}));
router.get('/logout', authController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();

const accountController = require('./accountController');

router.get('/', accountController.account);

module.exports = router;

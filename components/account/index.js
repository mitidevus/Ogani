const express = require('express');
const router = express.Router();

const accountController = require('./accountController');

router.get('/:email', accountController.account);

module.exports = router;

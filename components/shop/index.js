const express = require('express');
const router = express.Router();

const shopController = require('./shopController');

router.get('/', shopController.shop);//shop page

module.exports = router;

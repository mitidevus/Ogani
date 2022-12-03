const express = require('express');
const router = express.Router();

const detailController = require('./detailController');

router.get('/:productId', detailController.detail);//shop page

module.exports = router;

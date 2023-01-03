const express = require('express');
const router = express.Router();

const detailApiController = require('./detailApiController');

router.get('/:productId', detailApiController.getReviewByProductId);

module.exports = router;
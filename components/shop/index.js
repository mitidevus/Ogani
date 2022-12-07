const express = require('express');
const router = express.Router();

const shopController = require('./shopController');

router.get('/', shopController.shop);
router.get('/sort/:filter', shopController.shop);
router.get('/product_category/:category', shopController.category);

module.exports = router;
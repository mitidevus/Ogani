const express = require('express');
const router = express.Router();

const shopController = require('./shopController');

router.get('/:filter', shopController.shop); //shop page
router.get('/product_category/:category', shopController.category); //shop page

module.exports = router;

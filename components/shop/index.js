const express = require('express');
const router = express.Router();

const shopController = require('./shopController');

// router.get('/', shopController.shop);
// router.get('/sort/:filter', shopController.shop);
// router.get('/product_category/:category', shopController.category);

router.get('/page/:page', shopController.shop);

router.get('/page/:page/sort/:filter', shopController.shop);

router.get('/product_category/:category/page/:page', shopController.category);
// router.get('/product_category/', shopController.category);

// router.get('/sort/:filter/page/:numPage', shopController.shop);


// router.get('/product_category/:category/page/:numPage', shopController.category);

module.exports = router;
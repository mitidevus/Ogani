const express = require('express');
const router = express.Router();

const cartCheckoutController = require('./cartCheckoutController');

router.get('/', cartCheckoutController.cartCheckout);//shop page

module.exports = router;

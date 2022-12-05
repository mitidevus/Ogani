const homeService = require('./homeService');
const createError = require('http-errors');
const qs = require('qs');

exports.home= async (req, res) => {
  let  hotProducts = []; 
  let  categories = []; 
  hotProducts = await homeService.getAllProduct();
  categories = await homeService.getAllCategory();

  hotProducts = hotProducts.slice(6);

  res.render('home/page',{hotProducts})
};

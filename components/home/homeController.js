const homeService = require('./homeService');
const createError = require('http-errors');
const qs = require('qs');

exports.home = async (req, res) => {
  let hotProducts = [];
  //let  categories = [];
  hotProducts = await homeService.getAllProduct();
  //categories = await homeService.getAllCategory();

  /*
  hotProducts = hotProducts.slice(6);

  for (let i = 0; i < hotProducts.length; i++)
    hotProducts[i].price = hotProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  */

  hotProducts=hotProducts.filter(e=>e.hot_product===1)
  
  res.render('home/page', { hotProducts })
};

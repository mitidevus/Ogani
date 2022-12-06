const shopService = require('./shopService');

exports.shop = async (req, res) => {
  let listProducts = [];
  let listCategory = [];
  let latestProduct = [];

  listProducts = await shopService.getAllProduct();
  listCategory = await shopService.getAllCategory();
  latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < listProducts.length; i++)
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  for (let i = 0; i < latestProduct.length; i++)
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  console.log(listProducts);
  console.log(listCategory);

  res.render('shop/page', { listProducts, listCategory, latestProduct });
};

exports.shop = async (req, res) => {
  const filter = req.params.filter;
  console.log(filter);
  let listProducts = [];
  let listCategory = [];
  let latestProduct = [];


  listProducts = await shopService.getAllProduct();

  listCategory = await shopService.getAllCategory();
  latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < listProducts.length; i++)
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  for (let i = 0; i < latestProduct.length; i++)
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  console.log(listProducts);
  console.log(listCategory);

  res.render('shop/page', { listProducts, listCategory, latestProduct });
};

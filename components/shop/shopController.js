const shopService = require('./shopService');
const qs = require('qs');

exports.shop = async (req, res) => {
  const filter = req.params.filter;
  const { sort } = req.params;
  const { name: nameFilter } = req.query;
  console.log("sort", sort);
  console.log("filter", filter);
  console.log("nameFilter", nameFilter);

  let listProducts = [];
  let listCategory = [];
  let latestProduct = [];

  if (filter === "0") {
    listProducts = await shopService.getAllProduct();
  }
  else if (filter === "1") {
    listProducts = await shopService.getSortedProductByPrice_ASC();
  }
  console.log(listProducts);

  listCategory = await shopService.getAllCategory();
  latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < listProducts.length; i++)
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  for (let i = 0; i < latestProduct.length; i++)
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  console.log(listCategory);

  // res.render('shop/page', { listProducts, listCategory, latestProduct });

  res.render('shop/page', { listProducts, listCategory, latestProduct });
};

exports.category = async (req, res) => {
  const cate_Id = req.params.category;
  const listProducts = await shopService.getProductByCategory(cate_Id);
  console.log(listProducts);

  latestProduct = await shopService.getSortedProductByRelease_Date_Latest();

  latestProduct = latestProduct.slice(0, 5);

  listCategory = await shopService.getAllCategory();

  for (let i = 0; i < listProducts.length; i++)
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  for (let i = 0; i < latestProduct.length; i++)
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });


  // console.log("req.baseUrl", req.baseUrl);
  // console.log("category", category);
  // console.log("qs.stringify(withoutCategory)", withoutCategory);

  const { category, ...withoutcategory } = req.query;
  // res.render('products/list', { products, originalUrl: `${req.baseUrl}/${qs.stringify(withoutcategory)}` });

  res.render('shop/page', { listProducts, latestProduct, listCategory, originalUrl: `${req.baseUrl}/${qs.stringify(withoutcategory)}` });
}
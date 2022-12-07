const shopService = require('./shopService');
const qs = require('qs');

exports.shop = async (req, res) => {
  const filter = req.params.filter;
  const { name: nameFilter } = req.query;

  let listProducts = [];
  if (nameFilter) {
    listProducts = await shopService.filter(nameFilter);
  }
  else if (filter === "price-asc") {
    listProducts = await shopService.getSortedProductByPrice_ASC();
  }
  else if (filter === "price-desc") {
    listProducts = await shopService.getSortedProductByPrice_DESC();
  }
  else if (filter === "date-new") {
    listProducts = await shopService.getSortedProductByRelease_Date_Latest();
  }
  else if (filter === "date-old") {
    listProducts = await shopService.getSortedProductByRelease_Date_Oldest();
  }
  else if (filter === "rate-star-asc") {
    listProducts = await shopService.getSortedProductByRate_Star_ASC();
  }
  else if (filter === "rate-star-desc") {
    listProducts = await shopService.getSortedProductByRate_Star_DESC();
  }
  else {
    listProducts = await shopService.getAllProduct();
  }

  console.log("listProducts", listProducts);

  for (let i = 0; i < listProducts.length; i++) {
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listCategory = await shopService.getAllCategory();

  let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < latestProduct.length; i++) {
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  res.render('shop/page', { listProducts, listCategory, latestProduct, originalUrl: `${req.baseUrl}/${qs.stringify(filter)}` });
};

exports.category = async (req, res) => {
  let cate_Id = req.params.category;
  const { name: nameFilter } = req.query;
  console.log("nameFilter", nameFilter);

  let listProducts = [];

  if (nameFilter) {
    let allProductByCategory = await shopService.getProductByCategory(cate_Id);
    allProductByCategory.forEach((product) => {
      if (product.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        listProducts.push(product);
      }
    });
  }
  else {
    listProducts = await shopService.getProductByCategory(cate_Id);
  }

  for (let i = 0; i < listProducts.length; i++) {
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listCategory = await shopService.getAllCategory();

  let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);
  for (let i = 0; i < latestProduct.length; i++) {
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  res.render('shop/page', { listProducts, latestProduct, listCategory, originalUrl: `${req.baseUrl}/${qs.stringify(cate_Id)}` });
}
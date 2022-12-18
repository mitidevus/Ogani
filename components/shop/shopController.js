const shopService = require('./shopService');
const qs = require('qs');
const itemsPerPage = 2;

// exports.shop = async (req, res) => {
//   const filter = req.params.filter;
//   const { name: nameFilter } = req.query;

//   let listProducts = [];
//   if (nameFilter) {
//     listProducts = await shopService.filter(nameFilter);
//   }
//   else if (filter === "price-asc") {
//     listProducts = await shopService.getSortedProductByPrice_ASC();
//   }
//   else if (filter === "price-desc") {
//     listProducts = await shopService.getSortedProductByPrice_DESC();
//   }
//   else if (filter === "date-new") {
//     listProducts = await shopService.getSortedProductByRelease_Date_Latest();
//   }
//   else if (filter === "date-old") {
//     listProducts = await shopService.getSortedProductByRelease_Date_Oldest();
//   }
//   else if (filter === "rate-star-asc") {
//     listProducts = await shopService.getSortedProductByRate_Star_ASC();
//   }
//   else if (filter === "rate-star-desc") {
//     listProducts = await shopService.getSortedProductByRate_Star_DESC();
//   }
//   else {
//     listProducts = await shopService.getAllProduct();
//   }

//   console.log("listProducts", listProducts);

//   for (let i = 0; i < listProducts.length; i++) {
//     listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
//   }

//   let listCategory = await shopService.getAllCategory();

//   let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
//   latestProduct = latestProduct.slice(0, 5);

//   for (let i = 0; i < latestProduct.length; i++) {
//     latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
//   }

//   res.render('shop/page', { listProducts, listCategory, latestProduct, originalUrl: `${req.baseUrl}/${qs.stringify(filter)}` });
// };

exports.shop = async (req, res) => {
  const filter = req.params.filter;
  const { name: nameFilter } = req.query;
  let currentPage = req.params.page;
  let url_filter = "";
  let url_sort = "";

  console.log("currentPage", currentPage);

  console.log("a= " + nameFilter)

  //kt nếu có số page
  if (nameFilter) {
    url_filter = "?name=" + nameFilter;
  }
  if (filter) url_sort = "/sort/" + filter;

  let listProducts = [];
  if (nameFilter) {
    listProducts = await shopService.filter(nameFilter);
    console.log("listProducts Filter", listProducts);
  }
  else if (filter === "price-asc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByPrice_ASC();
    else listProducts.sort((a, b) => a.price - b.price);
    console.log("haha");
  }
  else if (filter === "price-desc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByPrice_DESC();
    else listProducts.sort((a, b) => b.price - a.price);
  }
  // else if (filter === "date-new") {
  //   if (!nameFilter)
  //     listProducts = await shopService.getSortedProductByRelease_Date_Latest();
  //   else listProducts.sort((a, b) => a.release_date - b.release_date);
  // }
  // else if (filter === "date-old") {
  //   if (!nameFilter)
  //     listProducts = await shopService.getSortedProductByRelease_Date_Oldest();
  //   else listProducts.sort((a, b) => b.release_date - a.release_date);
  // }
  else if (filter === "rate-star-asc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByRate_Star_ASC();
    else listProducts.sort((a, b) => a.rate_star - b.rate_star);
  }
  else if (filter === "rate-star-desc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByRate_Star_DESC();
    else listProducts.sort((a, b) => b.rate_star - a.rate_star);
  }
  else {
    listProducts = await shopService.getAllProduct();
  }
  console.log("listProducts.length", listProducts.length);

  const sumPage = Math.ceil(listProducts.length / itemsPerPage);//tổng số page cần có để chứa các sp

  let listTemp = [];
  for (let i = (currentPage - 1) * itemsPerPage; i < (currentPage - 1) * itemsPerPage + itemsPerPage; i++)
    if (i >= listProducts.length) break;
    else {
      listTemp.push(listProducts[i]);
      console.log("listProducts[i]", listProducts[i]);
    }
  listProducts = listTemp;


  for (let i = 0; i < listProducts.length; i++) {
    listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listCategory = await shopService.getAllCategory();

  let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < latestProduct.length; i++) {
    latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listcurrentPage = currentPage;
  let listLeftPage = [];
  let listRightPage = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < currentPage) {
      if (i > 0) listLeftPage.push(i)
    }
    if (i > currentPage) {
      if (i <= sumPage) listRightPage.push(i)
    }
  }

  console.log("currentPage", currentPage);

  res.render('shop/page', { url_sort, url_filter, listProducts, listCategory, listLeftPage, listcurrentPage, listRightPage, latestProduct, originalUrl: `/shop/page/1/${qs.stringify(filter)}` });
};

// exports.category = async (req, res) => {
//   let cate_Id = req.params.category;
//   const { name: nameFilter } = req.query;
//   console.log("nameFilter", nameFilter);

//   let listProducts = [];

//   if (nameFilter) {
//     let allProductByCategory = await shopService.getProductByCategory(cate_Id);
//     allProductByCategory.forEach((product) => {
//       if (product.name.toLowerCase().includes(nameFilter.toLowerCase())) {
//         listProducts.push(product);
//       }
//     });
//   }
//   else {
//     listProducts = await shopService.getProductByCategory(cate_Id);
//   }

//   for (let i = 0; i < listProducts.length; i++) {
//     listProducts[i].price = listProducts[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
//   }

//   let listCategory = await shopService.getAllCategory();

//   let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
//   latestProduct = latestProduct.slice(0, 5);
//   for (let i = 0; i < latestProduct.length; i++) {
//     latestProduct[i].price = latestProduct[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
//   }

//   res.render('shop/page', { listProducts, latestProduct, listCategory, originalUrl: `${req.baseUrl}/${qs.stringify(cate_Id)}` });
// }

exports.category = async (req, res) => {
  let cate_Id = req.params.category;
  const { name: nameFilter } = req.query;
  // const { sort: nameFilter } = req.params.;
  let currentPage = req.params.page;
  const checkCategory = true;
  let url_link = "/product_category/" + cate_Id;

  console.log("currentPage", currentPage);
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

  const sumPage = Math.ceil(listProducts.length / itemsPerPage);//tổng số page cần có để chứa các sp

  let listTemp = []
  for (let i = (currentPage - 1) * itemsPerPage; i < (currentPage - 1) * itemsPerPage + itemsPerPage; i++)
    if (i >= listProducts.length) break;
    else {
      listTemp.push(listProducts[i]);
    }
  listProducts = listTemp

  let listcurrentPage = currentPage;
  let listLeftPage = [];
  let listRightPage = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < currentPage) {
      if (i > 0) listLeftPage.push(i)
    }
    if (i > currentPage) {
      if (i <= sumPage) listRightPage.push(i)
    }
  }

  console.log("url_link", url_link);

  res.render('shop/page', { url_link, cate_Id, checkCategory, listProducts, latestProduct, listCategory, listLeftPage, listcurrentPage, listRightPage, originalUrl: `${req.baseUrl}/${qs.stringify(cate_Id)}` });
}
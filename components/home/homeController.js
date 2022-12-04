const homeService = require('./homeService');
const createError = require('http-errors');
const qs = require('qs');

exports.home= async (req, res) => {
  let  products = []; 
  let  categories = []; 
  products = await homeService.getAllProduct();
  categories = await homeService.getAllCategory();

  let tempCategories=categories;
  let productsCategory={};

  for(let i=0;i<tempCategories.length;i++)
  {
    let productTemp=[]

    for(let j=0;j<products.length;j++){
      if(tempCategories[i].category_Id==products[j].category_Id)
        productTemp.push(products[j])
    }

    productsCategory[categories.name]=productTemp

  }
// console.log('-------------------------------')
   
//     console.log(productsCategory)
  // const tam=products;

  // for(let i=0;i<tam.length;i++){
  //   tam[i].price=tam[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  // }
  
  //res.render('home/page',{categories,productsCategory});
  res.render('home/page',{categories,productsCategory});
};

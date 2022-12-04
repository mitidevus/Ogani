const { connection } = require('../../db');
const homeRepository = require('./homeRepository');

exports.getAllProduct = () => {
    return homeRepository.getAllProduct();
}
  
exports.getAllCategory = () => {
    return homeRepository.getAllCategory();
}

// exports.getAllProductCategory = (idCate,idProduct) => {
//     return homeRepository.getAllProductCategory(idCate,idProduct);
// }
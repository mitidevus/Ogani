const { connection } = require('../../db');
const detailRepository = require('./detailRepository');

exports.getAllProduct = () => {
    return detailRepository.getAllProduct();
}
  
exports.getProductById = (productId) => {
    return detailRepository.getProductById(productId);
}

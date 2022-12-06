const db = require('../../db');

exports.getAllProduct = async () => {
    const result = await db.connection.execute('select * from product');
    //console.log(result[0])
    return result[0];
}

exports.getProductById = async (productId) => {
    const result = await db.connection.execute('select * from product where product_Id=?', [productId]);
    //console.log(result[0][0])
    return result[0];
}
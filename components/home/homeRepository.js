const db = require('../../db');
exports.getAllProduct = async () => {
    const result =  await db.connection.execute('select * from product');
    //console.log(result[0])
    return result[0];
}

exports.getAllCategory = async () => {
    const result =  await db.connection.execute('select * from category');
    console.log(result[0])
    return result[0];
}

// exports.getAllProductCategory = async (idCate,idProduct) => {
//     const result =  await db.connection.execute('select * from category,product where ?=?',[idCate],[idProduct]);
//     console.log(result[0])
//     return result[0];
// }
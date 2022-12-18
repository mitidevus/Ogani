const db = require('../../db');
exports.getAllProduct = async () => {
    const result = await db.connection.execute('select * from Product');
    return result[0];
}

exports.getAllCategory = async () => {
    const result = await db.connection.execute('select * from category');
    console.log(result[0])
    return result[0];
}

exports.getSortedProductByPrice_ASC = async () => {
    const result = await db.connection.execute('select * from Product order by price');
    return result[0];
}

exports.getSortedProductByPrice_DESC = async () => {
    const result = await db.connection.execute('select * from Product order by price DESC');
    return result[0];
}

exports.getSortedProductByRelease_Date_Latest = async () => {
    const result = await db.connection.execute('select * from Product order by release_date');
    return result[0];
}

exports.getSortedProductByRelease_Date_Oldest = async () => {
    const result = await db.connection.execute('select * from Product order by release_date DESC');
    return result[0];
}

exports.getSortedProductByRate_Star_ASC = async () => {
    const result = await db.connection.execute('select * from Product order by rate_star');
    return result[0];
}

exports.getSortedProductByRate_Star_DESC = async () => {
    const result = await db.connection.execute('select * from Product order by rate_star DESC');
    return result[0];
}

exports.getProductByCategory = async (cate_Id) => {
    const result = await db.connection.execute('select * from Product where category_Id = ?', [cate_Id]);
    return result[0];
}

exports.filter = async (nameFilter) => {
    const result = await db.connection.execute(`SELECT * FROM product WHERE name LIKE ?`, [`%${nameFilter}%`]);
    console.log("result[0]", result[0]);
    return result[0];
}
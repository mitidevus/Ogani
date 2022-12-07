const shopRepository = require('./shopRepository');

exports.getAllProduct = () => {
    return shopRepository.getAllProduct();
}

exports.getAllCategory = () => {
    return shopRepository.getAllCategory();
}

exports.getSortedProductByPrice_ASC = () => {
    return shopRepository.getSortedProductByPrice_ASC();
}

exports.getSortedProductByPrice_DESC = () => {
    return shopRepository.getSortedProductByPrice_DESC();
}

exports.getSortedProductByRelease_Date_Latest = () => {
    return shopRepository.getSortedProductByRelease_Date_Latest();
}

exports.getSortedProductByRelease_Date_Oldest = () => {
    return shopRepository.getSortedProductByRelease_Date_Oldest();
}

exports.getSortedProductByRate_Star_ASC = () => {
    return shopRepository.getSortedProductByRate_Star_ASC();
}

exports.getSortedProductByRate_Star_DESC = () => {
    return shopRepository.getSortedProductByRate_Star_DESC();
}

exports.getProductByCategory = (cate_Id) => {
    return shopRepository.getProductByCategory(cate_Id);
}

exports.filter = (nameFilter) => {
    return shopRepository.filter(nameFilter);
}
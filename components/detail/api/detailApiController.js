const detailServive = require("../detailService");
const createError = require("http-errors");

const { REVIEW_ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require("../../../constant");

exports.getReviewByProductId = async (req, res) => {
    const { productId } = req.params;
    console.log(productId)

    let { page } = req.query;
    if (isNaN(page) || !Number.isInteger(parseFloat(page)) || page < 1) {
        page = 1;
    }
    let reviews;

    reviews = await detailServive.getReviewByProductId(productId, parseInt(page));
    res.json(reviews);
};
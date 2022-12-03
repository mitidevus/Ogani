
exports.detail = (req, res, next) => {
  const { productId } = req.params;

  res.render('detail/page');
};

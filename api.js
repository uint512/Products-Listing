const Products = require("./products");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  listProducts,
  getProduct,
  createProduct
});

async function getProduct(req, res, next) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) return next();

  res.json(product);
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    })
  );
}

async function createProduct(req, res, next) {
  console.log("request body", req.body);
  res.json(req.body);
}

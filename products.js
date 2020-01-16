const cuid = require("cuid");
const db = require("./db");

module.exports = {
  list,
  create,
  get,
  edit,
  remove
};

const Product = db.model("Product", {
  _id: { type: String, default: cuid },
  description: String,
  imgThumb: String,
  img: String,
  link: String,
  userId: String,
  username: String,
  userLink: String,
  tags: { type: [String], index: true }
});

async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts;
  const query = tag ? { tags: tag } : {};
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return products;
}

async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

async function get(_id) {
  const product = await Product.findById(_id);
  return product;
}

async function edit(_id, change) {
  const product = await get({ _id });
  Object.keys(change).forEach(function(key) {
    product[key] = change[key];
  });
  await product.save();
  return product;
}

async function remove(_id) {
  await Product.deleteOne(_id);
}

const cuid = require("cuid");
const db = require("./db");

module.exports = {
  list,
  create
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
  const { offset = 0, limit = 25, tag = "" } = opts;
  const data = await fs.readFile(productFiles);
  return JSON.parse(data)
    .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
    .slice(offset, offset + limit);
}

async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

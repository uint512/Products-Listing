const fs = require("fs").promises;
const path = require("path");

const productFiles = path.join(__dirname, "./products/products.json");

module.exports = {
  list
};

async function list() {
  const data = await fs.readFile(productFiles);
  return JSON.parse(data);
}

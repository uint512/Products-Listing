const db = require("../db");
const Products = require("../model/products");

const products = require("../products/products.json");

(async function() {
  for (var i = 0; i < products.length; i++) {
    console.log(await Products.create(products[i]));
  }
  db.disconnect();
})();

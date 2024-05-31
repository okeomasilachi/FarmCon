const sha1 = require("sha1");

const dbClient = require("../utils/db");
const redisClient = require("../utils/redis");
const { validateRequestData, authUser } = require("../utils/tools");

async function postNewProduct(req, res, next) {
  const { name, description, price, category } = req.body;
  const data = {
    name,
    description,
    price,
    category
  };
  const args = await validateRequestData(data, "products");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }

  try {
    const existingProduct = await dbClient.getByCriteria("products", { name });
    if (existingProduct.length > 0) {
      return res.status(409).json({ error: "Product already exists" }).end();
    }
    const product = await dbClient.create("products", data);
    return res.status(201).json(product).end();
  } catch (err) {
    return res.status(400).json({ error: `Error creating product [${err}]` }).end();
  }
}

async function updateProduct(req, res, next) {
  const usr = await authUser(req, true);
  if (usr) {
    const productId = req.params.id;
    const jsonData = req.body;
    if (Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: "Empty JSON object" }).end();
    }
    try {
      const product = await dbClient.update("products", productId, jsonData);
      return res.status(200).json(product).end();
    } catch (err) {
      return res.status(400).json({ error: "Error updating product" }).end();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

async function deleteProduct(req, res, next) {
  const usr = await authUser(req, true);
  if (usr) {
    const productId = req.params.id;
    try {
      const product = await dbClient.delete("products", productId);
      return res.status(200).json({}).end();
    } catch (err) {
      return res.status(400).json({ error: "Error deleting product" }).end();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

async function getProduct(req, res) {
  const productId = req.params.id;
  try {
    const product = await dbClient.getById("products", productId);
    if (product) {
      return res.status(200).json(product).end();
    } else {
      return res.status(404).json({ error: "Product not found" }).end();
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await dbClient.getAll("products");
    return res.status(200).json(products).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

module.exports = {
  postNewProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
};

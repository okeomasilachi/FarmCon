const dbClient = require("../utils/db");
const { validateRequestData } = require("../utils/tools");

/**
 * Handles the creation of a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function postNewProduct(req, res, next) {
  const product = req.body;
  const args = await validateRequestData(product, "products");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }
  try {
    const existingProduct = await dbClient.getByCriteria("products", {
      name: product.name,
      user_id: product.user_id,
    });
    if (existingProduct.length > 0) {
      return res.status(409).json({ error: "Product already exists" }).end();
    }
    const newProduct = await dbClient.create("products", product);
    return res.status(201).json(newProduct).end();
  } catch (err) {
    return res.status(400).json({ error: `Error creating product` }).end();
  }
}

/**
 * Handles the update of a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function updateProduct(req, res, next) {
  const productId = req.params.id;
  const jsonData = req.body;
  if (Object.keys(jsonData).length === 0) {
    return res.status(400).json({ error: "Empty JSON object" }).end();
  }
  try {
    const product = await dbClient.update("products", productId, jsonData);
    if (product) {
      return res.status(200).json({ message: "Update success" }).end();
    }
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: "Error updating product" }).end();
  }
}

/**
 * Handles the deletion of a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function deleteProduct(req, res, next) {
  const productId = req.params.id;
  try {
    const deleteCount = await dbClient.delete("products", productId);
    return deleteCount
      ? res.status(200).json({}).end()
      : res.status(404).json({ error: "Not found" }).end();
  } catch (err) {
    return res.status(400).json({ error: "Error deleting product" }).end();
  }
}

/**
 * Handles the retrieval of a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
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

/**
 * Handles the retrieval of all products.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function getAllProducts(req, res, next) {
  try {
    const products = await dbClient.getAll("products");
    return res.status(200).json(products).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

/**
 * Handles the update of a product image.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function productImage(req, res, next) {
  const productId = req.params.id;
  const imagePath = req.file.path;

  try {
    const updatedProduct = await dbClient.update("products", productId, {
      image_path: imagePath,
    });
    return res.status(200).json(updatedProduct).end();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Error updating product image" })
      .end();
  }
}

module.exports = {
  postNewProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  productImage,
};

const dbClient = require("../utils/db");
const { validateRequestData } = require("../utils/tools");
const fs = require("fs").promises;
const path = require("path");

/**
 * Handles the creation of a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function postNewProduct(req, res, next) {
  const product = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "Missing Product Image" }).end();
  }
  let newImagePath;
  !req.file
    ? (newImagePath = "uploads/profile_pictures/default_product_image.png")
    : (newImagePath = req.file.path);

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
    const newProduct = await dbClient.create("products", {
      ...product,
      image_path: newImagePath,
    });
    const productImageBase64 = await fs.readFile(newImagePath, {
      encoding: "base64",
    });

    // Send the response with product data and product image
    return res
      .status(201)
      .json({
        ...newProduct,
        image_base64: `data:image/png;base64,${productImageBase64}`,
      })
      .end();
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
      const productImageBase64 = await fs.readFile(product.image_path, {
        encoding: "base64",
      });
      return res
        .status(200)
        .json({
          ...product,
          image_base64: `data:image/png;base64,${productImageBase64}`,
        })
        .end();
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

    // Read and encode image data for each product
    const productsWithImageData = await Promise.all(
      products.map(async (product) => {
        if (product.image_path) {
          try {
            const imageData = await fs.readFile(product.image_path, {
              encoding: "base64",
            });
            product.image_data = `data:image/png;base64,${imageData}`;
          } catch (error) {
            console.error(
              `Error reading image file for product ${product._id}:`,
              error,
            );
          }
        }
        return product;
      }),
    );

    return res.status(200).json(productsWithImageData).end();
  } catch (err) {
    console.error("Error retrieving products:", err);
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
  if (!productId) {
    return res.status(400).json({ error: " Empty request :id" }).end();
  }
  if (!req.file) {
    return res.status(400).json({ error: "No file Attached" }).end();
  }
  const newImagePath = req.file.path;

  try {
    // Fetch the existing product
    const product = await dbClient.getById("products", productId);
    const currentImagePath = product.image_path;

    // Check if the current image is not default.png
    if (currentImagePath && path.basename(currentImagePath) !== "default.png") {
      try {
        await fs.unlink(currentImagePath);
        console.log(`Deleted file: ${currentImagePath}`);
      } catch (err) {
        console.error(`Error deleting file: ${currentImagePath}`, err);
      }
    }

    // Update product's image path
    const updatedProduct = await dbClient.update("products", productId, {
      image_path: newImagePath,
    });

    return res.status(200).json(updatedProduct).end();
  } catch (err) {
    console.error("Error updating product image:", err);
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

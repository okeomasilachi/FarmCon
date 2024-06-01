const dbClient = require("../utils/db");
const { validateRequestData } = require("../utils/tools");

/**
 * Handles the creation of a new feedback.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function postNewFeedback(req, res, next) {
  const data = req.body;
  const args = await validateRequestData(data, "feedbacks");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }
  if ((await dbClient.getById("users", data.user_id)) === false) {
    return res.status(404).json({ error: "User not found" }).end();
  }
  if ((await dbClient.getById("products", data.product_id)) === false) {
    return res.status(404).json({ error: "Product not found" }).end();
  }
  try {
    const feedback = await dbClient.create("feedbacks", data);
    return res.status(201).json(feedback).end();
  } catch (err) {
    console.error(err.errInfo.details);
    return res.status(400).json({ error: `Error creating feedback` }).end();
  }
}

/**
 * Retrieves feedbacks by user ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
async function getFeedbackByUser(req, res) {
  const user_id = req.params.user_id;
  try {
    const feedbacks = await dbClient.getByCriteria("feedbacks", { user_id });
    return res.status(200).json(feedbacks).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

/**
 * Retrieves feedbacks by product ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
async function getFeedbackByProduct(req, res) {
  const product_id = req.params.product_id;
  try {
    const feedbacks = await dbClient.getByCriteria("feedbacks", { product_id });
    return res.status(200).json(feedbacks).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

/**
 * Deletes a feedback by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function deleteFeedback(req, res, next) {
  const feedbackId = req.params.id;
  try {
    const feedback = await dbClient.delete("feedbacks", feedbackId);
    return feedback
      ? res.status(200).json({}).end()
      : res.status(404).json({ error: "Not found" }).end();
  } catch (err) {
    return res.status(400).json({ error: "Error deleting feedback" }).end();
  }
}

module.exports = {
  postNewFeedback,
  getFeedbackByUser,
  getFeedbackByProduct,
  deleteFeedback,
};

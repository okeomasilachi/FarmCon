const dbClient = require("../utils/db");
const { validateRequestData } = require("../utils/tools");

async function postNewFeedback(req, res, next) {
  const { userId, productId, rating, comment } = req.body;
  const data = {
    userId,
    productId,
    rating,
    comment,
  };
  const args = await validateRequestData(data, "feedback");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }

  try {
    const existingFeedback = await dbClient.getByCriteria("feedback", {
      userId,
      productId,
    });
    if (existingFeedback.length > 0) {
      return res.status(409).json({ error: "Feedback already exists" }).end();
    }
    const feedback = await dbClient.create("feedback", data);
    return res.status(201).json(feedback).end();
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Error creating feedback [${err}]` })
      .end();
  }
}

async function getFeedbackByUser(req, res) {
  const user_id = req.params.user_id;
  try {
    const feedbacks = await dbClient.getByCriteria("feedback", { user_id });
    return res.status(200).json(feedbacks).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

async function getFeedbackByProduct(req, res) {
  const product_id = req.params.product_id;
  try {
    const feedbacks = await dbClient.getByCriteria("feedback", { product_id });
    return res.status(200).json(feedbacks).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

async function deleteFeedback(req, res, next) {
  const usr = await authUser(req, true);
  if (usr) {
    const feedbackId = req.params.id;
    try {
      const feedback = await dbClient.delete("feedback", feedbackId);
      return res.status(200).json({}).end();
    } catch (err) {
      return res.status(400).json({ error: "Error deleting feedback" }).end();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = {
  postNewFeedback,
  getFeedbackByUser,
  getFeedbackByProduct,
  deleteFeedback,
};

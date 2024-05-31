const sha1 = require("sha1");

const dbClient = require("../utils/db");
const redisClient = require("../utils/redis");
const { validateRequestData, authUser } = require("../utils/tools");

async function postNewFeedback(req, res, next) {
  const { userId, productId, rating, comment } = req.body;
  const data = {
    userId,
    productId,
    rating,
    comment
  };
  const args = await validateRequestData(data, "feedback");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }

  try {
    const existingFeedback = await dbClient.getByCriteria("feedback", { userId, productId });
    if (existingFeedback.length > 0) {
      return res.status(409).json({ error: "Feedback already exists" }).end();
    }
    const feedback = await dbClient.create("feedback", data);
    return res.status(201).json(feedback).end();
  } catch (err) {
    return res.status(400).json({ error: `Error creating feedback [${err}]` }).end();
  }
}

async function updateFeedback(req, res, next) {
  const usr = await authUser(req, true);
  if (usr) {
    const feedbackId = req.params.id;
    const jsonData = req.body;
    if (Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: "Empty JSON object" }).end();
    }
    try {
      const feedback = await dbClient.update("feedback", feedbackId, jsonData);
      return res.status(200).json(feedback).end();
    } catch (err) {
      return res.status(400).json({ error: "Error updating feedback" }).end();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
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

async function getFeedback(req, res) {
  const feedbackId = req.params.id;
  try {
    const feedback = await dbClient.getById("feedback", feedbackId);
    if (feedback) {
      return res.status(200).json(feedback).end();
    } else {
      return res.status(404).json({ error: "Feedback not found" }).end();
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

async function getAllFeedback(req, res, next) {
  try {
    const feedbacks = await dbClient.getAll("feedback");
    return res.status(200).json(feedbacks).end();
  } catch (err) {
    return res.status(500).json({ error: "Server error" }).end();
  }
}

module.exports = {
  postNewFeedback,
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getAllFeedback,
};

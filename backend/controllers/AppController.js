/**
 * @module AppController
 */

const dbClient = require("../utils/db");
const redisClient = require("../utils/redis");
const formatUptime = require("../utils/tools").formatUptime;
const serverStartTime = require("../serverStartTime");
/**
 * Retrieves the status of the Redis and database connections.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The status of the Redis and database connections.
 */
async function getStatus(req, res) {
  const redisStatus = redisClient.isAlive();
  const dbStatus = dbClient.client.isConnected();

  const uptime = Date.now() - serverStartTime;
  return res.status(200).json({ cache: redisStatus, db: dbStatus, uptime: formatUptime(uptime)});
}

/**
 * Retrieves the statistics of the number of users and files.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The statistics of the number of users and files.
 */
async function getStats(req, res) {
  try {
    const users = await dbClient.getAll("users");
    const products = await dbClient.getAll("products");
    const feedbacks = await dbClient.getAll("feedbacks");
    return res.status(200).json({
      users: users.length,
      products: products.length,
      feedbacks: feedbacks.length,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getStats,
  getStatus,
};

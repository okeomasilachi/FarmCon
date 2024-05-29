const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

/**
 * Retrieves the status of the Redis and database connections.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The status of the Redis and database connections.
 */
async function getStatus(req, res) {
  const redisStatus = redisClient.isAlive();
  const dbStatus = dbClient.client.isConnected();

  res.status(200).json({ redis: redisStatus, db: dbStatus });
}

/**
 * Retrieves the statistics of the number of users and files.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The statistics of the number of users and files.
 */
async function getStats(req, res) {
  try {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();

    res.status(200).json({ users: numUsers, files: numFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getStats,
  getStatus,
};

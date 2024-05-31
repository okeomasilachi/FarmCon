const { v4: uuidv4 } = require("uuid");
const redisClient = require("../utils/redis");
const dbClient = require("../utils/db");
const sha1 = require("sha1");

/**
 * Handles the authentication process for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the authentication process is complete.
 */
async function getConnect(req, res) {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const auth = req.headers.authorization;
    const [email, password] = Buffer.from(auth.split(" ")[1], "base64")
      .toString("utf-8")
      .split(":");
    const user = await dbClient.getByCriteria('users', { email, password });
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      const token = uuidv4();
      console.log(user);
      // await redisClient.set(`auth_${token}`, user._id.toString(), 86400);
      res.status(200).json({ token });
    }
  }
}

/**
 * Handles the disconnection process for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the disconnection process is complete.
 */
async function getDisconnect(req, res) {
  const { "x-token": token } = req.headers;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await redisClient.del(`auth_${token}`);
      res.status(204).end();
    }
  }
}

module.exports = {
  getConnect,
  getDisconnect,
};

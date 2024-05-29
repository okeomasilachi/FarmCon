import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Handles the authentication process for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the authentication process is complete.
 */
async function getConnect(req, res) {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const auth = req.headers.authorization;
    const [email, passwd] = Buffer.from(auth.split(' ')[1], 'base64').toString('utf-8').split(':');

    const user = await dbClient.database.collection('users').findOne({ email, password: sha1(passwd) });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      const token = uuidv4();
      await redisClient.set(`auth_${token}`, user._id.toString(), 86400);
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
  const { 'x-token': token } = req.headers;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
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

import sha1 from 'sha1';

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const { validateRequestData, authUser } = require('../utils/tools');
/**
 * Handles the creation of a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
async function postNew(req, res, next) {
  if (await authUser(req)) {
    const args = validateRequestData(req.json, 'users');
    if (args) {
      return res.status(args.errorCode).json({ error: args.message }).end();
    }
    try {
      user = await dbClient.create('users', req.json())
      return res.status(201).json({ user }).end();
    } catch (err) {
      return res.status(400).json({ error: 'error creating user' }).end();
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }

}

async function update(req, res, next) {
  if (await authUser(req)) {
    const jsonData = req.json();
    if (Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: 'Empty JSON object' }).end();
    }
    try {
      user = await dbClient.update('users', id, jsonData);
      return res.status(201).json({ user }).end();
    } catch (err) {
      return res.status(400).json({ error: 'Error updating user' }).end();
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

/**
 * Retrieves the user information for the authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
async function getMe(req, res) {
  const token = req.headers['x-token'];
  if (await authUser(req)) {
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      try {
        const user = await dbClient.getById('users', userId)
        const { _id, email } = user;
        res.status(200).json({ _id, email });
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
      }
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  postNew,
  getMe,
};

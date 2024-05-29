import sha1 from 'sha1';

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const { validateRequestData, authUser } = require('../utils/tools');


async function postNew(req, res, next) {
  const args = validateRequestData(req.json(), 'users');
  if (args) {
    return res.status(args.errorCode).json({ error: args.message }).end();
  }
  try {
    user = await dbClient.create('users', req.json())
    return res.status(201).json({ user }).end();
  } catch (err) {
    return res.status(400).json({ error: 'error creating user' }).end();
  }
}

async function updateMe(req, res, next) {
  const usr = await authUser(req, data=true);
  if (usr) {
    const jsonData = req.json();
    if (Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: 'Empty JSON object' }).end();
    }
    try {
      user = await dbClient.update('users', usr._id, jsonData);
      return res.status(201).json({ user }).end();
    } catch (err) {
      return res.status(400).json({ error: 'Error updating user' }).end();
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

async function deleteMe(req, res, next) {
  const usr = await authUser(req, data=true);
  if (usr) {
    try {
      user = await dbClient.delete('users', usr._id);
      return res.status(200).json({}).end();
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting user' }).end();
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

async function getMe(req, res) {
  const usr = await authUser(req, data=true);
  if (usr) {
    try {
      const { _id, email } = usr;
      return res.status(200).json({ _id, email }).end();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' }).end();
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' }).end();
  }
}

module.exports = {
  postNew,
  getMe,
  deleteMe,
  updateMe,
};

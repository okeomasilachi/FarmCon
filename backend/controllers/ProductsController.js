// const dbClient = require('../utils/db');
// const redisClient = require('../utils/redis');
// const { validateRequestData, authUser } = require('../utils/tools');

// async function newProduct(req, res, next) {
//   if (await authUser(req)) {
//     const args = validateRequestData(req.json(), 'products');
//     if (args) {
//       return res.status(args.errorCode).json({ error: args.message }).end();
//     }
//     try {
//       product = await dbClient.create('products', req.json())
//       return res.status(201).json({ product }).end();
//     } catch (err) {
//       return res.status(400).json({ error: 'error creating products' }).end();
//     }
//   } else {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

// }

// async function updateProduct(req, res, next) {
//   if (await authUser(req)) {
//     const jsonData = req.json();
//     if (Object.keys(jsonData).length === 0) {
//       return res.status(400).json({ error: 'Empty JSON object' }).end();
//     }
//     try {
//       product = await dbClient.update('products', id, jsonData);
//       return res.status(201).json({ user }).end();
//     } catch (err) {
//       return res.status(400).json({ error: 'Error updating user' }).end();
//     }
//   } else {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// async function deleteMe(req, res, next) {
//   if (await authUser(req)) {
//     try {
//       user = await dbClient.delete('users', id);
//       return res.status(200).json({}).end();
//     } catch (err) {
//       return res.status(400).json({ error: 'Error deleting user' }).end();
//     }
//   } else {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// async function getMe(req, res) {
//   const token = req.headers['x-token'];
//   if (await authUser(req)) {
//     const userId = await redisClient.get(`auth_${token}`);
//     if (!userId) {
//       res.status(401).json({ error: 'Unauthorized' });
//     } else {
//       try {
//         const user = await dbClient.getById('users', userId)
//         const { _id, email } = user;
//         res.status(200).json({ _id, email });
//       } catch (error) {
//         res.status(401).json({ error: 'Unauthorized' });
//       }
//     }
//   } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// module.exports = {
//   postNew,
//   getMe,
//   deleteMe,
//   updateMe,
// };

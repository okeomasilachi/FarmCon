// const sha1 = require("sha1");

// const dbClient = require("../utils/db");
// const redisClient = require("../utils/redis");
// const { validateRequestData, authUser } = require("../utils/tools");

// async function postNew(req, res, next) {
//   const { password, username, email, role } = req.body;
//   const data = {
//     password: sha1(password),
//     username,
//     email,
//     role
//   };
//   const args = await validateRequestData(data, "users");
//   if (args) {
//     return res.status(400).json({ error: args.message }).end();
//   }

//   try {
//     const existingUser = await dbClient.getByCriteria("users", { email });
//     if (existingUser.length > 0) {
//       return res.status(409).json({ error: "User already exists" }).end();
//     }
//     const user = await dbClient.create("users", data);
//     return res.status(201).json(user).end();
//   } catch (err) {
//     return res.status(400).json({ error: `error creating user [${err}]` }).end();
//   }
// }

// async function updateMe(req, res, next) {
//   const usr = await authUser(req, (data = true));
//   if (usr) {
//     const jsonData = req.body;
//     if (Object.keys(jsonData).length === 0) {
//       return res.status(400).json({ error: "Empty JSON object" }).end();
//     }
//     try {
//       const user = await dbClient.update("users", usr._id.toString(), jsonData);
//       return res.status(201).json(user).end();
//     } catch (err) {
//       return res.status(400).json({ error: "Error updating user" }).end();
//     }
//   } else {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// }

// async function deleteMe(req, res, next) {
//   const usr = await authUser(req, (data = true));
//   if (usr) {
//     try {
//       const user = await dbClient.delete("users", usr._id);
//       return res.status(200).json({}).end();
//     } catch (err) {
//       return res.status(400).json({ error: "Error deleting user" }).end();
//     }
//   } else {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// }

// async function getMe(req, res) {
//   const usr = await authUser(req, (data = true));
//   if (usr) {
//     try {
//       const { _id, email } = usr;
//       return res.status(200).json({ _id, email }).end();
//     } catch (error) {
//       return res.status(401).json({ error: "Unauthorized" }).end();
//     }
//   } else {
//     return res.status(401).json({ error: "Unauthorized" }).end();
//   }
// }

// async function getAll(req, res, next) {
//   try {
//     const data = await dbClient.getAll("users");
//     const users = data.map(({ password, _id, ...rest }) => rest);
//     return res.status(200).json(users).end();
//   } catch (err) {
//     return res.status(500).json({ error: "server error" }).end();
//   }
// }

// module.exports = {
//   postNew,
//   getMe,
//   deleteMe,
//   updateMe,
//   getAll,
// };

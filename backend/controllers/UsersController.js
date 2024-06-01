const sha1 = require("sha1");
const dbClient = require("../utils/db");
const upload = require("../utils/multer");
const { validateRequestData } = require("../utils/tools");

/**
 * Handles the creation of a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function postNew(req, res, next) {
  const usersData = req.body;
  const args = await validateRequestData(usersData, "users");
  if (args) {
    return res.status(400).json({ error: args.message }).end();
  }
  const { password, username, email, role } = usersData;
  const data = { password: sha1(password), username, email, role };
  try {
    const existingUser = await dbClient.getByEmail(usersData.email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" }).end();
    }
    const user = await dbClient.create("users", data);
    const { email, _id } = user;
    return res.status(201).json({ email, id: _id }).end();
  } catch (err) {
    return res.status(400).json({ error: `error creating user]` }).end();
  }
}

/**
 * Updates the current user with the provided JSON data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function updateMe(req, res, next) {
  const jsonData = req.body;
  if (Object.keys(jsonData).length === 0) {
    return res.status(400).json({ error: "Empty JSON object" }).end();
  }
  try {
    const user = await dbClient.update(
      "users",
      req.user._id.toString(),
      jsonData,
    );
    if (user) {
      return res.status(201).json({ message: "Update success" }).end();
    }
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: "Error updating user" }).end();
  }
}

/**
 * Deletes the user associated with the request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object.
 */
async function deleteMe(req, res, next) {
  try {
    await dbClient.delete("users", req.user._id.toString());
    return res.status(200).json({}).end();
  } catch (err) {
    return res.status(400).json({ error: "Error deleting user" }).end();
  }
}

/**
 * Retrieves the details of the authenticated user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object containing the user details or an error message.
 */
async function getMe(req, res) {
  try {
    const { _id, email } = req.user;
    return res
      .status(200)
      .json({ id: req.user._id, email: req.user.email, role: req.user.role })
      .end();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" }).end();
  }
}

async function getAll(req, res, next) {
  try {
    const data = await dbClient.getAll("users");
    const users = data.map(({ password, _id, ...rest }) => rest);
    return res.status(200).json(users).end();
  } catch (err) {
    return res.status(500).json({ error: "server error" }).end();
  }
}

async function userImage(req, res) {
  const userId = req.params.id;
  const profilePicturePath = req.file.path;

  try {
    const updatedUser = await dbClient.update("users", userId, {
      profile_picture: profilePicturePath,
    });
    return res.status(200).json(updatedUser).end();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Error updating profile picture" })
      .end();
  }
}

module.exports = {
  postNew,
  getMe,
  deleteMe,
  updateMe,
  getAll,
  userImage,
};

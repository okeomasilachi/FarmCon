const sha1 = require("sha1");
const dbClient = require("../utils/db");
const { validateRequestData } = require("../utils/tools");
const fs = require("fs").promises;
const path = require("path");

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
  let newProfilePicturePath;
  !req.file
    ? (newProfilePicturePath =
        "uploads/profile_pictures/default_profile_pictures.png")
    : (newProfilePicturePath = req.file.path);

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
    const user = await dbClient.create("users", {
      ...data,
      profile_picture: newProfilePicturePath,
    });
    const { email: userEmail, _id, profile_picture } = user;

    // Read the profile picture file and convert it to base64
    const profilePictureBase64 = await fs.readFile(profile_picture, {
      encoding: "base64",
    });

    // Send the response with user data and profile picture
    return res
      .status(201)
      .json({
        email: userEmail,
        id: _id,
        profile_picture: profile_picture,
        profile_picture_base64: `data:image/png;base64,${profilePictureBase64}`,
      })
      .end();
  } catch (err) {
    return res.status(400).json({ error: `error creating user` }).end();
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
    const deleteCount = await dbClient.delete("users", req.user._id.toString());
    return deleteCount
      ? res.status(200).json({}).end()
      : res.status(404).json({ error: "Not found" }).end();
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
    const user = req.user;
    const { _id, email, role, profile_picture } = user;

    let profilePictureBase64;
    if (profile_picture) {
      try {
        profilePictureBase64 = await fs.readFile(profile_picture, {
          encoding: "base64",
        });
        profilePictureBase64 = `data:image/png;base64,${profilePictureBase64}`;
      } catch (error) {
        console.error(
          `Error reading profile picture: ${profile_picture}`,
          error,
        );
        profilePictureBase64 = null;
      }
    }

    return res
      .status(200)
      .json({
        id: _id,
        email,
        role,
        profile_picture: profilePictureBase64,
      })
      .end();
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return res.status(401).json({ error: "Unauthorized" }).end();
  }
}

/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with the list of users or an error message.
 */
async function getAll(req, res, next) {
  try {
    const data = await dbClient.getAll("users");
    const users = data.map(({ password, _id, ...rest }) => rest);
    return res.status(200).json(users).end();
  } catch (err) {
    return res.status(500).json({ error: "server error" }).end();
  }
}

/**
 * Updates the profile picture of a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters sent with the request.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} req.file - The uploaded file object.
 * @param {string} req.file.path - The path of the uploaded file.
 * @param {Object} res - The response object.
 * @returns {Object} The updated user object.
 */
async function userImage(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: " Empty request :id" }).end();
  }
  if (!req.file) {
    return res.status(400).json({ error: "Missing Profile Image" }).end();
  }
  const newProfilePicturePath = req.file.path;

  try {
    // Fetch the existing user
    const user = await dbClient.getById("users", userId);
    const currentProfilePicturePath = user.profile_picture;

    // Check if the current profile picture is not default.png
    if (
      currentProfilePicturePath &&
      path.basename(currentProfilePicturePath) !== "default.png"
    ) {
      try {
        await fs.unlink(currentProfilePicturePath);
        console.log(`Deleted file: ${currentProfilePicturePath}`);
      } catch (err) {
        console.error(`Error deleting file: ${currentProfilePicturePath}`, err);
      }
    }

    // Update user's profile picture path
    const updatedUser = await dbClient.update("users", userId, {
      profile_picture: newProfilePicturePath,
    });

    return res.status(200).json(updatedUser).end();
  } catch (err) {
    console.error("Error updating profile picture:", err);
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

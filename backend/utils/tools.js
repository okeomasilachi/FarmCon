const redisClient = require("./redis");
const dbClient = require("./db");

/**
 * Authenticates a user based on the provided request object.
 * @param {Object} req - The request object containing the headers.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean
 *      indicating whether the user is authenticated or not.
 */
async function authUser(req) {
  const { "x-token": token } = req.headers;
  if (!token) return false;
  try {
    const sessionToken = await redisClient.get(`auth_${token}`);
    if (sessionToken) {
      try {
        const user = await dbClient.getById("users", sessionToken);
        return user;
      } catch (err) {
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
}

const formatUptime = (uptime) => {
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

async function checkAuth(req, res, next) {
  const isAuthenticated = await authUser(req);
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" }).end();
  }
  req.user = isAuthenticated;
  next();
}

/**
 * Represents a map of JSON schemas for different collections in the database.
 *
 * @typedef {Object} SchemaMap
 * @property {Object} feedbacks - JSON schema for the "feedbacks" collection.
 * @property {Object} products - JSON schema for the "products" collection.
 * @property {Object} users - JSON schema for the "users" collection.
 */
/**
 * Map of JSON schemas for different collections in the database.
 *
 * @type {SchemaMap}
 */
const schemaMap = {
  feedbacks: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["rating", "user_id", "product_id", "comment"],
        properties: {
          rating: { bsonType: "int", minimum: 1, maximum: 5 },
          user_id: { bsonType: "objectId" },
          product_id: { bsonType: "objectId" },
          comment: { bsonType: "string" },
        },
      },
    },
  },
  products: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "name",
          "description",
          "planting_period_start",
          "planting_period_end",
          "harvesting_period_start",
          "harvesting_period_end",
          "rate_of_production",
          "state",
          "address",
        ],
        properties: {
          name: { bsonType: "string" },
          description: { bsonType: "string" },
          planting_period_start: { bsonType: "date" },
          planting_period_end: { bsonType: "date" },
          harvesting_period_start: { bsonType: "date" },
          harvesting_period_end: { bsonType: "date" },
          user_id: { bsonType: "objectId" },
          rate_of_production: { bsonType: "double" },
          status: {
            bsonType: "string",
            enum: ["Pending", "Approved", "Rejected"],
          },
          state: { bsonType: "string" },
          address: { bsonType: "string" },
          latitude: { bsonType: "double" },
          longitude: { bsonType: "double" },
          image_path: { bsonType: "string" },
        },
      },
    },
  },
  users: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password", "role"],
        properties: {
          username: { bsonType: "string" },
          email: { bsonType: "string" },
          password: { bsonType: "string" },
          role: { bsonType: "string", enum: ["Super Admin", "Admin", "User"] },
          profile_picture: { bsonType: "string" },
        },
      },
    },
  },
};

/**
 * Validates the request data against the schema for the specified collection.
 * @param {Object} data - The request data to be validated.
 * @param {string} collectionName - The name of the collection to validate against.
 * @returns {Object|null} - An object containing the error code and message if validation fails, or null if validation passes.
 */
async function validateRequestData(data, collectionName) {
  if (!data) {
    return {
      errorCode: 400,
      message: `Invalid data: data is ${data}.`,
    };
  }

  // Fetch the schema for the specified collection
  const schema = schemaMap[collectionName];

  if (!schema) {
    return {
      errorCode: 404,
      message: `No schema.`,
    };
  }

  // Proceed with validation using the fetched schema
  for (const field of schema.validator.$jsonSchema.required) {
    if (!(field in data)) {
      return {
        errorCode: 400,
        message: `Missing '${field}' field.`,
      };
    }
  }
  return false;
}

module.exports = {
  authUser,
  validateRequestData,
  checkAuth,
  formatUptime,
};

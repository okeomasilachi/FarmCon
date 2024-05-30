const redisClient = require("./redis");
const dbClient = require("./db");
const { ObjectId } = require("mongodb");

/**
 * Authenticates a user based on the provided request object.
 * @param {Object} req - The request object containing the headers.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean
 *      indicating whether the user is authenticated or not.
 */
async function authUser(req, data = undefined) {
  const { "x-token": token } = req.headers;

  if (!token) return false;
  try {
    const sessionToken = await redisClient.get(`auth_${token}`);
    if (sessionToken) {
      try {
        const user = await dbClient.getById("users", sessionToken);
        return data === undefined ? true : user;
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
        required: ["rating", "user_id", "product_id"],
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
          "location_id",
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
          location_id: { bsonType: "objectId" },
          rate_of_production: { bsonType: "double" },
          status: {
            bsonType: "string",
            enum: ["Pending", "Approved", "Rejected"],
          },
          state: { bsonType: "string" },
          address: { bsonType: "string" },
          latitude: { bsonType: "double" },
          longitude: { bsonType: "double" },
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

    const fieldSchema = schema.validator.$jsonSchema.properties[field];
    const fieldValue = data[field];

    if (fieldSchema) {
      const fieldType = fieldSchema.bsonType;
      if (fieldType === "int" && !Number.isInteger(fieldValue)) {
        return {
          errorCode: 400,
          message: `Field ${field} must be an integer.`,
        };
      }

      if (fieldType === "double" && typeof fieldValue !== "number") {
        return {
          errorCode: 400,
          message: `Field ${field} must be a double.`,
        };
      }

      if (fieldType === "string" && typeof fieldValue !== "string") {
        return {
          errorCode: 400,
          message: `Field ${field} must be a string.`,
        };
      }

      if (fieldType === "objectId" && !ObjectId.isValid(fieldValue)) {
        return {
          errorCode: 400,
          message: `Field ${field} must be a valid ObjectId.`,
        };
      }

      if (fieldType === "date" && !(fieldValue instanceof Date)) {
        return {
          errorCode: 400,
          message: `Field ${field} must be a Date object.`,
        };
      }
    }
  }

  return false;
}

module.exports = {
  authUser,
  validateRequestData,
};

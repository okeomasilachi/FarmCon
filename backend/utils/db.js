const { MongoClient, ObjectId } = require("mongodb");

/**
 * Represents a MongoDB client for interacting with the database.
 */
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || "localhost";
    const { MongoClient, ObjectId } = require("mongodb");

    /**
     * Represents a MongoDB client for interacting with the database.
     */
    class DBClient {
      constructor() {
        const host = process.env.DB_HOST || "localhost";
        const port = process.env.DB_PORT || 27017;
        const database = "FarmCon" || process.env.DB_DATABASE || "FarmCon";

        const uri = `mongodb://${host}:${port}/${database}`;
        this.client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        this.connect();
      }

      /**
       * Connects to the MongoDB database.
       * @returns {Promise<void>} A promise that resolves when the connection is established.
       */
      async connect() {
        try {
          await this.client.connect();
          this.db = this.client.db(); // Assign the database instance
          console.log("Connected to MongoDB");
          await this.createCollections(); // Create collections after connecting
        } catch (error) {
          console.error("Failed to connect to MongoDB:", error);
        }
      }

      /**
       * Checks if a collection already exists in the database.
       * @param {string} name The name of the collection to check.
       * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the collection exists.
       */
      async collectionExists(name) {
        const collections = await this.db.listCollections().toArray();
        return collections.some((collection) => collection.name === name);
      }

      /**
       * Creates collections with specified validators.
       */
      async createCollections() {
        const collections = [
          {
            name: "feedbacks",
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
          {
            name: "products",
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
          {
            name: "users",
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["username", "email", "password", "role"],
                properties: {
                  username: { bsonType: "string" },
                  email: { bsonType: "string" },
                  password: { bsonType: "string" },
                  role: {
                    bsonType: "string",
                    enum: ["Super Admin", "Admin", "User"],
                  },
                },
              },
            },
          },
        ];

        for (const collection of collections) {
          await this.createCollection(collection.name, collection.validator);
        }
      }

      /**
       * Creates a collection with the specified name and validator if it doesn't already exist.
       * @param {string} name The name of the collection to create.
       * @param {object} validator The validator object for the collection.
       */
      async createCollection(name, validator) {
        try {
          // Check if the collection already exists
          const collectionExists = await this.collectionExists(name);
          if (!collectionExists) {
            await this.db.createCollection(name, { validator });
            console.log(`Collection '${name}' created successfully.`);
          } else {
            console.log(`Collection '${name}' already exists.`);
          }
        } catch (error) {
          console.error(`Error creating collection '${name}':`, error);
        }
      }
    }

    const dbClient = new DBClient();
    module.exports = dbClient;

    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "FarmCon";

    const uri = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connect();
  }

  /**
   * Connects to the MongoDB database.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(); // Assign the database instance
      console.log("Connected to MongoDB");
      await this.createCollections(); // Create collections after connecting
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  /**
   * Creates collections with specified validators.
   */
  async createCollections() {
    const collections = [
      {
        name: "feedbacks",
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
      {
        name: "products",
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
      {
        name: "users",
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password", "role"],
            properties: {
              username: { bsonType: "string" },
              email: { bsonType: "string" },
              password: { bsonType: "string" },
              role: {
                bsonType: "string",
                enum: ["Super Admin", "Admin", "User"],
              },
            },
          },
        },
      },
    ];

    for (const collection of collections) {
      await this.createCollection(collection.name, collection.validator);
    }
  }

  /**
   * Creates a collection with the specified name and validator.
   * @param {string} name The name of the collection to create.
   * @param {object} validator The validator object for the collection.
   */
  async createCollection(name, validator) {
    try {
      await this.db.createCollection(name, { validator });
      console.log(`Collection '${name}' created successfully.`);
    } catch (error) {
      console.error(`Error creating collection '${name}':`, error);
    }
  }

  /**
   * Checks if the database connection is alive.
   * @returns {boolean} Returns true if the database connection is alive, otherwise false.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Creates a new document in the specified collection.
   * @param {string} collectionName - The name of the collection.
   * @param {Object} data - The data for the new document.
   * @returns {Promise<Object>} A promise that resolves with the created document.
   * @throws {Error} If an error occurs while creating the document.
   */
  async create(collectionName, data) {
    try {
      const result = await this.db.collection(collectionName).insertOne(data);
      return result.ops[0];
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Updates an existing document in the specified collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to update.
   * @param {Object} newData - The new data for the document.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the document was updated.
   * @throws {Error} If an error occurs while updating the document.
   */
  async update(collectionName, id, newData) {
    try {
      const result = await this.db
        .collection(collectionName)
        .updateOne({ _id: ObjectId(id) }, { $set: newData });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a document from the specified collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to delete.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the document was deleted.
   * @throws {Error} If an error occurs while deleting the document.
   */
  async delete(collectionName, id) {
    try {
      const result = await this.db
        .collection(collectionName)
        .deleteOne({ _id: ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Retrieves a document by its ID from the specified collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string} id - The ID of the document to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves with the retrieved document, or null if not found.
   * @throws {Error} If an error occurs while retrieving the document.
   */
  async getById(collectionName, id) {
    try {
      const result = await this.db
        .collection(collectionName)
        .findOne({ _id: ObjectId(id) });
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      console.error(
        `Error getting document by ID in ${collectionName}:`,
        error,
      );
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const result = await this.db
        .collection("users")
        .findOne({ email: email });
      console.log(result);
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      console.error(
        `Error getting document by Email in ${collectionName}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Retrieves all documents from the specified collection.
   * @param {string} collectionName - The name of the collection.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of all documents in the collection.
   * @throws {Error} If an error occurs while retrieving the documents.
   */
  async getAll(collectionName) {
    try {
      return await this.db.collection(collectionName).find().toArray();
    } catch (error) {
      console.error(`Error getting all documents in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Retrieves documents based on multiple criteria.
   * @param {string} collectionName - The name of the collection.
   * @param {Object} criteria - The criteria for retrieving documents.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of matching documents.
   * @throws {Error} If an error occurs while retrieving the documents.
   */
  async getByCriteria(collectionName, criteria) {
    try {
      const query = {};

      if (criteria.user_id) query.user_id = ObjectId(criteria.user_id);
      if (criteria.product_id) query.product_id = ObjectId(criteria.product_id);
      if (criteria.planting_period_start)
        query.planting_period_start = {
          $gte: new Date(criteria.planting_period_start),
        };
      if (criteria.planting_period_end)
        query.planting_period_end = {
          $lte: new Date(criteria.planting_period_end),
        };
      if (criteria.harvesting_period_start)
        query.harvesting_period_start = {
          $gte: new Date(criteria.harvesting_period_start),
        };
      if (criteria.harvesting_period_end)
        query.harvesting_period_end = {
          $lte: new Date(criteria.harvesting_period_end),
        };
      if (criteria.status) query.status = criteria.status;
      if (criteria.state) query.state = criteria.state;
      if (criteria.email) query.email = criteria.email;
      if (criteria.password) query.password = criteria.password;

      return await this.db.collection(collectionName).find(query).toArray();
    } catch (error) {
      console.error(
        `Error getting documents by criteria in ${collectionName}:`,
        error,
      );
      throw error;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;

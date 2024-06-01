const { MongoClient, ObjectId } = require("mongodb");
/**
 * Represents a MongoDB client for interacting with the database.
 */
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = "FarmCon" || process.env.DB_DATABASE;
    const username = "FarmCon" || process.env.DB_USERNAME; // Replace with your actual username
    const password = "NyOkEoBmAl6gZbdK" || process.env.DB_PASSWORD; // Replace with your actual password

    const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.qpa4khn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.databaseName = database;
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
      },
      {
        name: "products",
      },
      {
        name: "users",
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
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        const result = await this.db
          .collection(collectionName)
          .updateOne({ _id: ObjectId(id) }, { $set: newData });
        return result.modifiedCount > 0;
      } else {
        return fasle;
      }
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
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        const result = await this.db
          .collection(collectionName)
          .deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Error deleting document in ${collectionName}:`, error);
      return false; // Return false in case of an error to ensure application stability
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
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        const result = await this.db
          .collection(collectionName)
          .findOne({ _id: ObjectId(id) });
        if (!result) {
          return false;
        }
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.error(
        `Error getting document by ID in ${collectionName}:`,
        error,
      );
      throw error;
    }
  }

  async getByEmail(email) {
    if (email !== undefined) {
      try {
        const result = await this.db
          .collection("users")
          .findOne({ email: email });
        if (!result) {
          return false;
        }
        return result;
      } catch (error) {
        console.error(
          `Error getting document by Email in users collection:`,
          error,
        );
        throw error;
      }
    }
    return false;
  }

  // async getUEM(email, password) {
  //   if (email !== undefined || password !=== undefined || (email !== undefined && password !=== undefined)) {
  //     try {
  //       const result = await this.db
  //         .collection("users")
  //         .findOne({ email: email, password: password});
  //       if (!result) {
  //         return false;
  //       }
  //       return result;
  //     } catch (error) {
  //       console.error(
  //         `Error getting document by Email in users collection:`,
  //         error,
  //       );
  //       throw error;
  //     }
  //   }
  //   return false;
  // }

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
   * @param {Object} filters - The filter criteria for retrieving documents.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of documents matching the criteria.
   * @throws {Error} If an error occurs while retrieving the documents.
   */
  async getByCriteria(collectionName, filters) {
    try {
      return await this.db.collection(collectionName).find(filters).toArray();
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

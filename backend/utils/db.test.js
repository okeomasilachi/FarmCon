const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const { MongoClient, ObjectId } = require("mongodb");
const DBClient = require("../utils/db");

describe("DBClient", () => {
  let clientStub;
  let dbStub;
  let collectionStub;

  before(() => {
    clientStub = sinon.stub(MongoClient.prototype, "connect");
    dbStub = sinon.stub(MongoClient.prototype, "db");
    collectionStub = sinon.stub();
    dbStub.returns({ collection: collectionStub });
  });

  after(() => {
    clientStub.restore();
    dbStub.restore();
  });

  describe("connect", () => {
    it("should connect to the MongoDB database", async () => {
      const createCollectionsStub = sinon.stub(
        DBClient.prototype,
        "createCollections"
      );
      const dbClient = new DBClient();
      await dbClient.connect();
      expect(clientStub.calledOnce).to.be.true;
      expect(dbStub.calledOnce).to.be.true;
      expect(createCollectionsStub.calledOnce).to.be.true;
      createCollectionsStub.restore();
    });

    it("should log an error if failed to connect to MongoDB", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      clientStub.rejects(new Error("Connection failed"));
      const dbClient = new DBClient();
      await dbClient.connect();
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("collectionExists", () => {
    it("should return true if the collection exists", async () => {
      const listCollectionsStub = sinon
        .stub()
        .returns([
          { name: "feedbacks" },
          { name: "products" },
          { name: "users" },
        ]);
      collectionStub.returns({ listCollections: listCollectionsStub });
      const dbClient = new DBClient();
      const exists = await dbClient.collectionExists("products");
      expect(exists).to.be.true;
    });

    it("should return false if the collection does not exist", async () => {
      const listCollectionsStub = sinon
        .stub()
        .returns([{ name: "feedbacks" }, { name: "users" }]);
      collectionStub.returns({ listCollections: listCollectionsStub });
      const dbClient = new DBClient();
      const exists = await dbClient.collectionExists("products");
      expect(exists).to.be.false;
    });
  });

  describe("createCollections", () => {
    it("should create collections that do not exist", async () => {
      const createCollectionStub = sinon.stub(
        DBClient.prototype,
        "createCollection"
      );
      const dbClient = new DBClient();
      await dbClient.createCollections();
      expect(createCollectionStub.calledThrice).to.be.true;
      createCollectionStub.restore();
    });
  });

  describe("createCollection", () => {
    it("should create a collection if it does not exist", async () => {
      const collectionExistsStub = sinon
        .stub(DBClient.prototype, "collectionExists")
        .resolves(false);
      const createCollectionStub = sinon.stub(
        dbStub().prototype,
        "createCollection"
      );
      const consoleLogStub = sinon.stub(console, "log");
      const dbClient = new DBClient();
      await dbClient.createCollection("products");
      expect(collectionExistsStub.calledOnce).to.be.true;
      expect(createCollectionStub.calledOnce).to.be.true;
      expect(consoleLogStub.calledOnce).to.be.true;
      collectionExistsStub.restore();
      createCollectionStub.restore();
      consoleLogStub.restore();
    });

    it("should not create a collection if it already exists", async () => {
      const collectionExistsStub = sinon
        .stub(DBClient.prototype, "collectionExists")
        .resolves(true);
      const createCollectionStub = sinon.stub(
        dbStub().prototype,
        "createCollection"
      );
      const consoleLogStub = sinon.stub(console, "log");
      const dbClient = new DBClient();
      await dbClient.createCollection("products");
      expect(collectionExistsStub.calledOnce).to.be.true;
      expect(createCollectionStub.called).to.be.false;
      expect(consoleLogStub.calledOnce).to.be.true;
      collectionExistsStub.restore();
      createCollectionStub.restore();
      consoleLogStub.restore();
    });

    it("should log an error if failed to create a collection", async () => {
      const collectionExistsStub = sinon
        .stub(DBClient.prototype, "collectionExists")
        .resolves(false);
      const createCollectionStub = sinon
        .stub(dbStub().prototype, "createCollection")
        .throws(new Error("Failed to create collection"));
      const consoleErrorStub = sinon.stub(console, "error");
      const dbClient = new DBClient();
      await dbClient.createCollection("products");
      expect(collectionExistsStub.calledOnce).to.be.true;
      expect(createCollectionStub.calledOnce).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      collectionExistsStub.restore();
      createCollectionStub.restore();
      consoleErrorStub.restore();
    });
  });

  describe("isAlive", () => {
    it("should return true if the database connection is alive", () => {
      const isConnectedStub = sinon.stub().returns(true);
      const dbClient = new DBClient();
      dbClient.client = { isConnected: isConnectedStub };
      const isAlive = dbClient.isAlive();
      expect(isAlive).to.be.true;
    });

    it("should return false if the database connection is not alive", () => {
      const isConnectedStub = sinon.stub().returns(false);
      const dbClient = new DBClient();
      dbClient.client = { isConnected: isConnectedStub };
      const isAlive = dbClient.isAlive();
      expect(isAlive).to.be.false;
    });
  });

  describe("create", () => {
    it("should create a new document in the specified collection", async () => {
      const insertOneStub = sinon
        .stub()
        .resolves({ ops: [{ _id: "document_id" }] });
      const collection = { insertOne: insertOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const data = { name: "Product 1" };
      const document = await dbClient.create("products", data);
      expect(insertOneStub.calledOnceWith(data)).to.be.true;
      expect(document).to.deep.equal({ _id: "document_id" });
    });

    it("should log an error if failed to create a document", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const insertOneStub = sinon
        .stub()
        .rejects(new Error("Failed to create document"));
      const collection = { insertOne: insertOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const data = { name: "Product 1" };
      await dbClient.create("products", data);
      expect(insertOneStub.calledOnceWith(data)).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("update", () => {
    it("should update an existing document in the specified collection", async () => {
      const updateOneStub = sinon.stub().resolves({ modifiedCount: 1 });
      const collection = { updateOne: updateOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      const newData = { name: "Updated Product" };
      const updated = await dbClient.update("products", id, newData);
      expect(
        updateOneStub.calledOnceWith({ _id: ObjectId(id) }, { $set: newData })
      ).to.be.true;
      expect(updated).to.be.true;
    });

    it("should return false if the document ID is invalid", async () => {
      const updateOneStub = sinon.stub();
      const collection = { updateOne: updateOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "invalid_id";
      const newData = { name: "Updated Product" };
      const updated = await dbClient.update("products", id, newData);
      expect(updateOneStub.called).to.be.false;
      expect(updated).to.be.false;
    });

    it("should log an error if failed to update a document", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const updateOneStub = sinon
        .stub()
        .rejects(new Error("Failed to update document"));
      const collection = { updateOne: updateOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      const newData = { name: "Updated Product" };
      await dbClient.update("products", id, newData);
      expect(
        updateOneStub.calledOnceWith({ _id: ObjectId(id) }, { $set: newData })
      ).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("delete", () => {
    it("should delete a document from the specified collection", async () => {
      const deleteOneStub = sinon.stub().resolves({ deletedCount: 1 });
      const collection = { deleteOne: deleteOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      const deleted = await dbClient.delete("products", id);
      expect(deleteOneStub.calledOnceWith({ _id: new ObjectId(id) })).to.be
        .true;
      expect(deleted).to.be.true;
    });

    it("should return false if the document ID is invalid", async () => {
      const deleteOneStub = sinon.stub();
      const collection = { deleteOne: deleteOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "invalid_id";
      const deleted = await dbClient.delete("products", id);
      expect(deleteOneStub.called).to.be.false;
      expect(deleted).to.be.false;
    });

    it("should log an error if failed to delete a document", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const deleteOneStub = sinon
        .stub()
        .rejects(new Error("Failed to delete document"));
      const collection = { deleteOne: deleteOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      await dbClient.delete("products", id);
      expect(deleteOneStub.calledOnceWith({ _id: new ObjectId(id) })).to.be
        .true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("getById", () => {
    it("should retrieve a document by its ID from the specified collection", async () => {
      const findOneStub = sinon.stub().resolves({ _id: "document_id" });
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      const document = await dbClient.getById("products", id);
      expect(findOneStub.calledOnceWith({ _id: ObjectId(id) })).to.be.true;
      expect(document).to.deep.equal({ _id: "document_id" });
    });

    it("should return false if the document ID is invalid", async () => {
      const findOneStub = sinon.stub();
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "invalid_id";
      const document = await dbClient.getById("products", id);
      expect(findOneStub.called).to.be.false;
      expect(document).to.be.false;
    });

    it("should log an error if failed to retrieve a document by ID", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const findOneStub = sinon
        .stub()
        .rejects(new Error("Failed to retrieve document"));
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const id = "document_id";
      await dbClient.getById("products", id);
      expect(findOneStub.calledOnceWith({ _id: ObjectId(id) })).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("getByEmail", () => {
    it("should retrieve a document by email from the 'users' collection", async () => {
      const findOneStub = sinon.stub().resolves({ email: "test@example.com" });
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("users").returns(collection);
      const dbClient = new DBClient();
      const email = "test@example.com";
      const document = await dbClient.getByEmail(email);
      expect(findOneStub.calledOnceWith({ email })).to.be.true;
      expect(document).to.deep.equal({ email: "test@example.com" });
    });

    it("should return false if the email is undefined", async () => {
      const findOneStub = sinon.stub();
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("users").returns(collection);
      const dbClient = new DBClient();
      const email = undefined;
      const document = await dbClient.getByEmail(email);
      expect(findOneStub.called).to.be.false;
      expect(document).to.be.false;
    });

    it("should log an error if failed to retrieve a document by email", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const findOneStub = sinon
        .stub()
        .rejects(new Error("Failed to retrieve document"));
      const collection = { findOne: findOneStub };
      collectionStub.withArgs("users").returns(collection);
      const dbClient = new DBClient();
      const email = "test@example.com";
      await dbClient.getByEmail(email);
      expect(findOneStub.calledOnceWith({ email })).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("getAll", () => {
    it("should retrieve all documents from the specified collection", async () => {
      const findStub = sinon
        .stub()
        .returns({ toArray: sinon.stub().resolves([{ _id: "document_id" }]) });
      const collection = { find: findStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const documents = await dbClient.getAll("products");
      expect(findStub.calledOnce).to.be.true;
      expect(documents).to.deep.equal([{ _id: "document_id" }]);
    });

    it("should log an error if failed to retrieve all documents", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const findStub = sinon
        .stub()
        .returns({
          toArray: sinon
            .stub()
            .rejects(new Error("Failed to retrieve documents")),
        });
      const collection = { find: findStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      await dbClient.getAll("products");
      expect(findStub.calledOnce).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });

  describe("getByCriteria", () => {
    it("should retrieve documents based on multiple criteria from the specified collection", async () => {
      const findStub = sinon
        .stub()
        .returns({ toArray: sinon.stub().resolves([{ _id: "document_id" }]) });
      const collection = { find: findStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const filters = { category: "electronics" };
      const documents = await dbClient.getByCriteria("products", filters);
      expect(findStub.calledOnceWith(filters)).to.be.true;
      expect(documents).to.deep.equal([{ _id: "document_id" }]);
    });

    it("should log an error if failed to retrieve documents by criteria", async () => {
      const consoleErrorStub = sinon.stub(console, "error");
      const findStub = sinon
        .stub()
        .returns({
          toArray: sinon
            .stub()
            .rejects(new Error("Failed to retrieve documents")),
        });
      const collection = { find: findStub };
      collectionStub.withArgs("products").returns(collection);
      const dbClient = new DBClient();
      const filters = { category: "electronics" };
      await dbClient.getByCriteria("products", filters);
      expect(findStub.calledOnceWith(filters)).to.be.true;
      expect(consoleErrorStub.calledOnce).to.be.true;
      consoleErrorStub.restore();
    });
  });
});

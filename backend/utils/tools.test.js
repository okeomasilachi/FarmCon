const chai = require("chai");
const sinon = require("sinon");
const redisClient = require("./redis");
const dbClient = require("./db");
const {
  authUser,
  validateRequestData,
  checkAuth,
} = require("./tools");

const { expect } = chai;

describe("tools", () => {
  describe("authUser", () => {
    it("should return false if no token is provided", async () => {
      const req = {
        headers: {},
      };

      const isAuthenticated = await authUser(req);

      expect(isAuthenticated).to.be.false;
    });

    it("should return false if the session token is not found in Redis", async () => {
      const req = {
        headers: {
          "x-token": "invalid_token",
        },
      };
      sinon.stub(redisClient, "get").returns(null);

      const isAuthenticated = await authUser(req);

      expect(isAuthenticated).to.be.false;

      redisClient.get.restore();
    });

    it("should return false if an error occurs while fetching the user from the database", async () => {
      const req = {
        headers: {
          "x-token": "valid_token",
        },
      };
      sinon.stub(redisClient, "get").returns("session_token");
      sinon.stub(dbClient, "getById").throws(new Error("Database error"));

      const isAuthenticated = await authUser(req);

      expect(isAuthenticated).to.be.false;

      redisClient.get.restore();
      dbClient.getById.restore();
    });

    it("should return the user if the session token is found in Redis and the user is fetched from the database", async () => {
      const req = {
        headers: {
          "x-token": "valid_token",
        },
      };
      const user = { _id: "user_id" };
      sinon.stub(redisClient, "get").returns("session_token");
      sinon.stub(dbClient, "getById").returns(user);

      const isAuthenticated = await authUser(req);

      expect(isAuthenticated).to.deep.equal(user);

      redisClient.get.restore();
      dbClient.getById.restore();
    });
  });

  describe("validateRequestData", () => {
    it("should return an error object if no data is provided", async () => {
      const collectionName = "users";
      const data = null;

      const error = await validateRequestData(data, collectionName);

      expect(error).to.deep.equal({
        errorCode: 400,
        message: "Invalid data: data is null.",
      });
    });

    it("should return an error object if the schema for the specified collection is not found", async () => {
      const collectionName = "invalid_collection";
      const data = {};

      const error = await validateRequestData(data, collectionName);

      expect(error).to.deep.equal({
        errorCode: 404,
        message: "No schema.",
      });
    });

    it("should return an error object if a required field is missing in the data", async () => {
      const collectionName = "users";
      const data = {
        username: "john_doe",
        email: "john@example.com",
        role: "User",
      };

      const error = await validateRequestData(data, collectionName);

      expect(error).to.deep.equal({
        errorCode: 400,
        message: "Missing 'password' field.",
      });
    });

    it("should return false if the data passes validation", async () => {
      const collectionName = "users";
      const data = {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
        role: "User",
      };

      const error = await validateRequestData(data, collectionName);

      expect(error).to.be.false;
    });
  });

  describe("checkAuth", () => {
    it("should return a 401 status code and 'Unauthorized' message if the user is not authenticated", async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };
      sinon.stub(redisClient, "get").returns(null);

      await checkAuth(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: "Unauthorized" })).to.be.true;
      expect(res.end.calledOnce).to.be.true;

      redisClient.get.restore();
    });

    it("should set the 'user' property in the request object and call the 'next' function if the user is authenticated", async () => {
      const req = {
        headers: {
          "x-token": "valid_token",
        },
      };
      const res = {};
      const next = sinon.stub();
      const user = { _id: "user_id" };
      sinon.stub(redisClient, "get").returns("session_token");
      sinon.stub(dbClient, "getById").returns(user);

      await checkAuth(req, res, next);

      expect(req.user).to.deep.equal(user);
      expect(next.calledOnce).to.be.true;

      redisClient.get.restore();
      dbClient.getById.restore();
    });
  });
});

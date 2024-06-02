const chai = require("chai");
const sinon = require("sinon");
const dbClient = require("../utils/db");
const redisClient = require("../utils/redis");
const appController = require("./AppController");

const { expect } = chai;

describe("AppController", () => {
  describe("getStatus", () => {
    it("should return the status of the Redis and database connections", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(redisClient, "isAlive").returns(true);
      sinon.stub(dbClient.client, "isConnected").returns(true);

      await appController.getStatus(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ redis: true, db: true })).to.be.true;

      redisClient.isAlive.restore();
      dbClient.client.isConnected.restore();
    });
  });

  describe("getStats", () => {
    it("should return the statistics of the number of users and files", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ];
      const products = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      const feedbacks = [
        { id: 1, message: "Feedback 1" },
        { id: 2, message: "Feedback 2" },
      ];
      sinon
        .stub(dbClient, "getAll")
        .withArgs("users")
        .returns(users)
        .withArgs("products")
        .returns(products)
        .withArgs("feedbacks")
        .returns(feedbacks);

      await appController.getStats(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          users: users.length,
          products: products.length,
          feedbacks: feedbacks.length,
        })
      ).to.be.true;

      dbClient.getAll.restore();
    });

    it("should return an error response if an error occurs", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const errorMessage = "Database error";
      sinon.stub(dbClient, "getAll").throws(new Error(errorMessage));

      await appController.getStats(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: errorMessage })).to.be.true;

      dbClient.getAll.restore();
    });
  });
});

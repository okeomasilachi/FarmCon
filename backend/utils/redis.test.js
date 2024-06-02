const chai = require("chai");
const sinon = require("sinon");
const { v4: uuidv4 } = require("uuid");
const redisClient = require("../utils/redis");
const dbClient = require("../utils/db");
const sha1 = require("sha1");
const {
  getConnect,
  getDisconnect,
} = require("./AuthController");

const { expect } = chai;

describe("AuthController", () => {
  describe("getConnect", () => {
    it("should return a token if the user is authenticated", async () => {
      const req = {
        headers: {
          authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const user = { _id: "user_id" };
      sinon.stub(dbClient, "getByCriteria").returns(user);
      sinon.stub(redisClient, "set").resolves();

      await getConnect(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ token: sinon.match.string })).to.be.true;

      dbClient.getByCriteria.restore();
      redisClient.set.restore();
    });

    it("should return an error response if the user is not authenticated", async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByCriteria").returns(null);

      await getConnect(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;

      dbClient.getByCriteria.restore();
    });

    it("should return an error response if the authorization header is invalid", async () => {
      const req = {
        headers: {
          authorization: "InvalidAuthorizationHeader",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await getConnect(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Invalid authorization header" })).to
        .be.true;
    });
  });

  describe("getDisconnect", () => {
    it("should disconnect the user and return a 204 status code", async () => {
      const req = {
        headers: {
          "x-token": "valid_token",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };
      sinon.stub(redisClient, "get").returns("user_id");
      sinon.stub(redisClient, "del").resolves();

      await getDisconnect(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;

      redisClient.get.restore();
      redisClient.del.restore();
    });

    it("should return an error response if the user is not authenticated", async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(redisClient, "get").returns(null);

      await getDisconnect(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;

      redisClient.get.restore();
    });
  });
});

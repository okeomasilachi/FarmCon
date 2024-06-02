const chai = require("chai");
const sinon = require("sinon");
const dbClient = require("../utils/db");
const {
  postNewFeedback,
  getFeedbackByUser,
  getFeedbackByProduct,
  deleteFeedback,
} = require("./FeedbackController");

const { expect } = chai;

describe("FeedbackController", () => {
  describe("postNewFeedback", () => {
    it("should create a new feedback and return a 201 status code", async () => {
      const req = {
        body: {
          user_id: "user_id",
          product_id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "validateRequestData").resolves(null);
      sinon.stub(dbClient, "getById").returns(true);
      sinon.stub(dbClient, "create").resolves({});

      await postNewFeedback(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.validateRequestData.restore();
      dbClient.getById.restore();
      dbClient.create.restore();
    });

    it("should return a 400 status code and an error message if request data is invalid", async () => {
      const req = {
        body: {
          // Add invalid request data
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon
        .stub(dbClient, "validateRequestData")
        .resolves({ message: "Invalid request data" });

      await postNewFeedback(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Invalid request data" })).to.be.true;

      dbClient.validateRequestData.restore();
    });

    it("should return a 404 status code and an error message if user is not found", async () => {
      const req = {
        body: {
          user_id: "non_existing_user_id",
          product_id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "validateRequestData").resolves(null);
      sinon.stub(dbClient, "getById").returns(false);

      await postNewFeedback(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "User not found" })).to.be.true;

      dbClient.validateRequestData.restore();
      dbClient.getById.restore();
    });

    it("should return a 404 status code and an error message if product is not found", async () => {
      const req = {
        body: {
          user_id: "user_id",
          product_id: "non_existing_product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "validateRequestData").resolves(null);
      sinon.stub(dbClient, "getById").returns(true);
      sinon.stub(dbClient, "create").resolves({});

      await postNewFeedback(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Product not found" })).to.be.true;

      dbClient.validateRequestData.restore();
      dbClient.getById.restore();
      dbClient.create.restore();
    });

    it("should return a 400 status code and an error message if there is an error creating the feedback", async () => {
      const req = {
        body: {
          user_id: "user_id",
          product_id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "validateRequestData").resolves(null);
      sinon.stub(dbClient, "getById").returns(true);
      sinon
        .stub(dbClient, "create")
        .rejects(new Error("Error creating feedback"));

      await postNewFeedback(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error creating feedback" })).to.be
        .true;

      dbClient.validateRequestData.restore();
      dbClient.getById.restore();
      dbClient.create.restore();
    });
  });

  describe("getFeedbackByUser", () => {
    it("should retrieve feedbacks by user ID and return a 200 status code", async () => {
      const req = {
        params: {
          user_id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByCriteria").resolves([]);

      await getFeedbackByUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.getByCriteria.restore();
    });

    it("should return a 500 status code and an error message if there is a server error", async () => {
      const req = {
        params: {
          user_id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByCriteria").rejects(new Error("Server error"));

      await getFeedbackByUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Server error" })).to.be.true;

      dbClient.getByCriteria.restore();
    });
  });

  describe("getFeedbackByProduct", () => {
    it("should retrieve feedbacks by product ID and return a 200 status code", async () => {
      const req = {
        params: {
          product_id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByCriteria").resolves([]);

      await getFeedbackByProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.getByCriteria.restore();
    });

    it("should return a 500 status code and an error message if there is a server error", async () => {
      const req = {
        params: {
          product_id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByCriteria").rejects(new Error("Server error"));

      await getFeedbackByProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Server error" })).to.be.true;

      dbClient.getByCriteria.restore();
    });
  });

  describe("deleteFeedback", () => {
    it("should delete a feedback by ID and return a 200 status code", async () => {
      const req = {
        params: {
          id: "feedback_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").resolves(true);

      await deleteFeedback(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.delete.restore();
    });

    it("should return a 404 status code and an error message if feedback is not found", async () => {
      const req = {
        params: {
          id: "non_existing_feedback_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").resolves(false);

      await deleteFeedback(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Not found" })).to.be.true;

      dbClient.delete.restore();
    });

    it("should return a 400 status code and an error message if there is an error deleting the feedback", async () => {
      const req = {
        params: {
          id: "feedback_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon
        .stub(dbClient, "delete")
        .rejects(new Error("Error deleting feedback"));

      await deleteFeedback(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error deleting feedback" })).to.be
        .true;

      dbClient.delete.restore();
    });
  });
});

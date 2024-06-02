const chai = require("chai");
const sinon = require("sinon");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const sha1 = require("sha1");
const dbClient = require("../utils/db");
const {
  postNew,
  getMe,
  deleteMe,
  updateMe,
  getAll,
  userImage,
} = require("./UsersController");

const { expect } = chai;

describe("UsersController", () => {
  describe("postNew", () => {
    it("should create a new user and return the user data with profile picture", async () => {
      const req = {
        body: {
          password: "password",
          username: "testuser",
          email: "testuser@example.com",
          role: "user",
        },
        file: {
          path: "uploads/profile_pictures/test_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const user = {
        email: "testuser@example.com",
        _id: "user_id",
        profile_picture: "uploads/profile_pictures/test_profile_picture.png",
      };
      const profilePictureBase64 = "base64_encoded_image";
      sinon.stub(dbClient, "getByEmail").returns(null);
      sinon.stub(dbClient, "create").returns(user);
      sinon.stub(fs, "readFile").resolves(profilePictureBase64);

      await postNew(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({
          email: "testuser@example.com",
          id: "user_id",
          profile_picture: "uploads/profile_pictures/test_profile_picture.png",
          profile_picture_base64: "data:image/png;base64,base64_encoded_image",
        })
      ).to.be.true;

      dbClient.getByEmail.restore();
      dbClient.create.restore();
      fs.readFile.restore();
    });

    it("should return an error response if the user already exists", async () => {
      const req = {
        body: {
          password: "password",
          username: "testuser",
          email: "testuser@example.com",
          role: "user",
        },
        file: {
          path: "uploads/profile_pictures/test_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon
        .stub(dbClient, "getByEmail")
        .returns({ email: "testuser@example.com" });

      await postNew(req, res);

      expect(res.status.calledWith(409)).to.be.true;
      expect(res.json.calledWith({ error: "User already exists" })).to.be.true;

      dbClient.getByEmail.restore();
    });

    it("should return an error response if there is an error creating the user", async () => {
      const req = {
        body: {
          password: "password",
          username: "testuser",
          email: "testuser@example.com",
          role: "user",
        },
        file: {
          path: "uploads/profile_pictures/test_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getByEmail").returns(null);
      sinon.stub(dbClient, "create").throws(new Error("Database error"));

      await postNew(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "error creating user" })).to.be.true;

      dbClient.getByEmail.restore();
      dbClient.create.restore();
    });
  });

  describe("getMe", () => {
    it("should return the details of the authenticated user", async () => {
      const req = {
        user: {
          _id: "user_id",
          email: "testuser@example.com",
          role: "user",
          profile_picture: "uploads/profile_pictures/test_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const profilePictureBase64 = "base64_encoded_image";
      sinon.stub(fs, "readFile").resolves(profilePictureBase64);

      await getMe(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          id: "user_id",
          email: "testuser@example.com",
          role: "user",
          profile_picture: "data:image/png;base64,base64_encoded_image",
        })
      ).to.be.true;

      fs.readFile.restore();
    });

    it("should return an error response if there is an error retrieving user details", async () => {
      const req = {
        user: {
          _id: "user_id",
          email: "testuser@example.com",
          role: "user",
          profile_picture: "uploads/profile_pictures/test_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(fs, "readFile").throws(new Error("File read error"));

      await getMe(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;

      fs.readFile.restore();
    });
  });

  describe("deleteMe", () => {
    it("should delete the authenticated user and return a 200 status code", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").returns(1);

      await deleteMe(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.delete.restore();
    });

    it("should return an error response if there is an error deleting the user", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").throws(new Error("Database error"));

      await deleteMe(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error deleting user" })).to.be.true;

      dbClient.delete.restore();
    });

    it("should return a 404 status code if the user is not found", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").returns(0);

      await deleteMe(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Not found" })).to.be.true;

      dbClient.delete.restore();
    });
  });

  describe("updateMe", () => {
    it("should update the authenticated user and return a 201 status code", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
        body: {
          username: "newusername",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").returns({ _id: "user_id" });

      await updateMe(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: "Update success" })).to.be.true;

      dbClient.update.restore();
    });

    it("should return an error response if the request body is empty", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await updateMe(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Empty JSON object" })).to.be.true;
    });

    it("should return an error response if there is an error updating the user", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
        body: {
          username: "newusername",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").throws(new Error("Database error"));

      await updateMe(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error updating user" })).to.be.true;

      dbClient.update.restore();
    });

    it("should return a 204 status code if the user is not found", async () => {
      const req = {
        user: {
          _id: "user_id",
        },
        body: {
          username: "newusername",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").returns(null);

      await updateMe(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.update.restore();
    });
  });

  describe("getAll", () => {
    it("should return the list of all users", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const users = [
        { _id: "user1", username: "user1" },
        { _id: "user2", username: "user2" },
      ];
      sinon.stub(dbClient, "getAll").returns(users);

      await getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(users)).to.be.true;

      dbClient.getAll.restore();
    });

    it("should return an error response if there is an error retrieving the users", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getAll").throws(new Error("Database error"));

      await getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "server error" })).to.be.true;

      dbClient.getAll.restore();
    });
  });

  describe("userImage", () => {
    it("should update the profile picture of a user and return the updated user object", async () => {
      const req = {
        params: {
          id: "user_id",
        },
        file: {
          path: "uploads/profile_pictures/new_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const user = {
        _id: "user_id",
        profile_picture: "uploads/profile_pictures/new_profile_picture.png",
      };
      sinon.stub(dbClient, "getById").returns(user);
      sinon.stub(fs, "unlink").resolves();

      await userImage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(user)).to.be.true;

      dbClient.getById.restore();
      fs.unlink.restore();
    });

    it("should return an error response if the request is missing the user ID", async () => {
      const req = {
        params: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await userImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: " Empty request :id" })).to.be.true;
    });

    it("should return an error response if the request is missing the profile image", async () => {
      const req = {
        params: {
          id: "user_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await userImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Missing Profile Image" })).to.be
        .true;
    });

    it("should return an error response if there is an error updating the profile picture", async () => {
      const req = {
        params: {
          id: "user_id",
        },
        file: {
          path: "uploads/profile_pictures/new_profile_picture.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getById").throws(new Error("Database error"));

      await userImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error updating profile picture" }))
        .to.be.true;

      dbClient.getById.restore();
    });
  });
});

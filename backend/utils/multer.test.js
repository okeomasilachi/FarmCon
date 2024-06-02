const chai = require("chai");
const sinon = require("sinon");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadHandler, handleMulterErrors } = require("../utils/multer");

const { expect } = chai;

describe("multer.js", () => {
  describe("uploadHandler", () => {
    it("should upload a file to the correct destination", () => {
      const req = {
        file: {
          fieldname: "profile_picture",
          originalname: "test.jpg",
        },
      };
      const res = {};
      const cb = sinon.stub();
      const mkdirSyncStub = sinon.stub(fs, "mkdirSync");
      const existsSyncStub = sinon.stub(fs, "existsSync").returns(false);

      uploadHandler.storage.destination(req, req.file, cb);

      expect(mkdirSyncStub.calledOnce).to.be.true;
      expect(
        mkdirSyncStub.calledWith("uploads/profile_pictures/", {
          recursive: true,
        })
      ).to.be.true;
      expect(cb.calledOnce).to.be.true;
      expect(cb.calledWith(null, "uploads/profile_pictures/")).to.be.true;

      mkdirSyncStub.restore();
      existsSyncStub.restore();
    });

    it("should generate a unique filename for the uploaded file", () => {
      const req = {};
      const file = {
        originalname: "test.jpg",
      };
      const cb = sinon.stub();
      const dateNowStub = sinon.stub(Date, "now").returns(1629876543210);

      uploadHandler.storage.filename(req, file, cb);

      expect(cb.calledOnce).to.be.true;
      expect(cb.calledWith(null, "1629876543210.jpg")).to.be.true;

      dateNowStub.restore();
    });
  });

  describe("handleMulterErrors", () => {
    it("should handle LIMIT_UNEXPECTED_FILE error", () => {
      const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        end: sinon.stub(),
      };
      const next = sinon.stub();

      handleMulterErrors(err, req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Unexpected file field" })).to.be
        .true;
      expect(res.end.calledOnce).to.be.true;
      expect(next.notCalled).to.be.true;
    });

    it("should forward other errors to the default error handler", () => {
      const err = new Error("Some error");
      const req = {};
      const res = {};
      const next = sinon.stub();

      handleMulterErrors(err, req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(err)).to.be.true;
    });
  });
});

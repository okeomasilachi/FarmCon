const chai = require("chai");
const sinon = require("sinon");
const fs = require("fs").promises;
const path = require("path");
const dbClient = require("../utils/db");
const {
  postNewProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  productImage,
} = require("./ProductsController");

const { expect } = chai;

describe("ProductsController", () => {
  describe("postNewProduct", () => {
    it("should create a new product and return the product data with image base64", async () => {
      const req = {
        body: {
          name: "Product 1",
          user_id: "user_id",
        },
        file: {
          path: "uploads/profile_pictures/product_image.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const existingProduct = [];
      sinon.stub(dbClient, "getByCriteria").returns(existingProduct);
      sinon.stub(dbClient, "create").resolves({
        _id: "product_id",
        name: "Product 1",
        user_id: "user_id",
        image_path: "uploads/profile_pictures/product_image.png",
      });
      sinon.stub(fs, "readFile").resolves("image_base64");

      await postNewProduct(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({
          _id: "product_id",
          name: "Product 1",
          user_id: "user_id",
          image_base64: "data:image/png;base64,image_base64",
        })
      ).to.be.true;

      dbClient.getByCriteria.restore();
      dbClient.create.restore();
      fs.readFile.restore();
    });

    it("should return an error response if the product already exists", async () => {
      const req = {
        body: {
          name: "Product 1",
          user_id: "user_id",
        },
        file: {
          path: "uploads/profile_pictures/product_image.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const existingProduct = [{ _id: "existing_product_id" }];
      sinon.stub(dbClient, "getByCriteria").returns(existingProduct);

      await postNewProduct(req, res);

      expect(res.status.calledWith(409)).to.be.true;
      expect(res.json.calledWith({ error: "Product already exists" })).to.be
        .true;

      dbClient.getByCriteria.restore();
    });

    it("should return an error response if there is an error creating the product", async () => {
      const req = {
        body: {
          name: "Product 1",
          user_id: "user_id",
        },
        file: {
          path: "uploads/profile_pictures/product_image.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const existingProduct = [];
      sinon.stub(dbClient, "getByCriteria").returns(existingProduct);
      sinon.stub(dbClient, "create").rejects();

      await postNewProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error creating product" })).to.be
        .true;

      dbClient.getByCriteria.restore();
      dbClient.create.restore();
    });
  });

  describe("getProduct", () => {
    it("should return the product data with image base64 if the product exists", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const product = {
        _id: "product_id",
        name: "Product 1",
        user_id: "user_id",
        image_path: "uploads/profile_pictures/product_image.png",
      };
      sinon.stub(dbClient, "getById").returns(product);
      sinon.stub(fs, "readFile").resolves("image_base64");

      await getProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          _id: "product_id",
          name: "Product 1",
          user_id: "user_id",
          image_base64: "data:image/png;base64,image_base64",
        })
      ).to.be.true;

      dbClient.getById.restore();
      fs.readFile.restore();
    });

    it("should return an error response if the product does not exist", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getById").returns(null);

      await getProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Product not found" })).to.be.true;

      dbClient.getById.restore();
    });

    it("should return an error response if there is an error retrieving the product", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getById").rejects();

      await getProduct(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Server error" })).to.be.true;

      dbClient.getById.restore();
    });
  });

  describe("deleteProduct", () => {
    it("should delete the product and return a 200 status code if the product exists", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").returns(1);

      await deleteProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.delete.restore();
    });

    it("should return an error response if the product does not exist", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").returns(0);

      await deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Not found" })).to.be.true;

      dbClient.delete.restore();
    });

    it("should return an error response if there is an error deleting the product", async () => {
      const req = {
        params: {
          id: "product_id",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "delete").rejects();

      await deleteProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error deleting product" })).to.be
        .true;

      dbClient.delete.restore();
    });
  });

  describe("updateProduct", () => {
    it("should update the product and return a 200 status code if the product exists", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        body: {
          name: "Updated Product",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").returns(true);

      await updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Update success" })).to.be.true;

      dbClient.update.restore();
    });

    it("should return a 204 status code if the product does not exist", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        body: {
          name: "Updated Product",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").returns(false);

      await updateProduct(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      dbClient.update.restore();
    });

    it("should return an error response if there is an error updating the product", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        body: {
          name: "Updated Product",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "update").rejects();

      await updateProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error updating product" })).to.be
        .true;

      dbClient.update.restore();
    });

    it("should return an error response if the JSON object is empty", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await updateProduct(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Empty JSON object" })).to.be.true;
    });
  });

  describe("getAllProducts", () => {
    it("should return all products with image data", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const products = [
        {
          _id: "product_id_1",
          name: "Product 1",
          user_id: "user_id",
          image_path: "uploads/profile_pictures/product_image_1.png",
        },
        {
          _id: "product_id_2",
          name: "Product 2",
          user_id: "user_id",
          image_path: "uploads/profile_pictures/product_image_2.png",
        },
      ];
      sinon.stub(dbClient, "getAll").returns(products);
      sinon.stub(fs, "readFile").resolves("image_base64");

      await getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith([
          {
            _id: "product_id_1",
            name: "Product 1",
            user_id: "user_id",
            image_path: "uploads/profile_pictures/product_image_1.png",
            image_data: "data:image/png;base64,image_base64",
          },
          {
            _id: "product_id_2",
            name: "Product 2",
            user_id: "user_id",
            image_path: "uploads/profile_pictures/product_image_2.png",
            image_data: "data:image/png;base64,image_base64",
          },
        ])
      ).to.be.true;

      dbClient.getAll.restore();
      fs.readFile.restore();
    });

    it("should return an error response if there is an error retrieving the products", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getAll").rejects();

      await getAllProducts(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Server error" })).to.be.true;

      dbClient.getAll.restore();
    });
  });

  describe("productImage", () => {
    it("should update the product's image path and return the updated product", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        file: {
          path: "uploads/profile_pictures/new_product_image.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const product = {
        _id: "product_id",
        name: "Product 1",
        user_id: "user_id",
        image_path: "uploads/profile_pictures/product_image.png",
      };
      sinon.stub(dbClient, "getById").returns(product);
      sinon.stub(dbClient, "update").returns(product);

      await productImage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;

      dbClient.getById.restore();
      dbClient.update.restore();
    });

    it("should return an error response if the product ID is missing", async () => {
      const req = {
        params: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: " Empty request :id" })).to.be.true;
    });

    it("should return an error response if no file is attached", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        file: null,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "No file Attached" })).to.be.true;
    });

    it("should return an error response if there is an error updating the product image", async () => {
      const req = {
        params: {
          id: "product_id",
        },
        file: {
          path: "uploads/profile_pictures/new_product_image.png",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(dbClient, "getById").returns(null);

      await productImage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Error updating product image" })).to
        .be.true;

      dbClient.getById.restore();
    });
  });
});

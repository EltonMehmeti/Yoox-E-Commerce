const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { uploadImages } = require("../Helpers/fileUpload");
const db = require("../Config/dbConfig");
// Fetch products
router.get("/getproducts", (req, res) => {
  productController.getProducts(req, res, db);
});

// Create product with file upload
router.post("/insert", uploadImages, (req, res) => {
  productController.insertProduct(req, res, db);
});

// Update product with file upload
router.put("/update/:id", uploadImages, (req, res) => {
  productController.updateProduct(req, res, db);
});

// Delete product
router.delete("/delete/:id", (req, res) => {
  productController.deleteProduct(req, res, db);
});

module.exports = router;

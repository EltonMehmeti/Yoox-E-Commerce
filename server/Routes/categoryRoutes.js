// categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.get("/getcategories", (req, res) => {
  categoryController.fetchCategories(req, res, db);
});

router.get("/getBanka", (req, res) => {
  categoryController.fetchBanka(req, res, db);
});

router.post("/create", (req, res) => {
  categoryController.createCategory(req, res, db);
});

router.delete("/delete/:id", (req, res) => {
  categoryController.deleteCategory(req, res, db);
});

router.put("/update/:id", (req, res) => {
  categoryController.updateCategory(req, res, db);
});

module.exports = router;

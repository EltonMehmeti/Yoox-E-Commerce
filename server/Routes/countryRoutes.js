const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");
const { uploadSingleImage } = require("../Helpers/fileUpload");
const db = require("../Config/dbConfig");
// Fetch products
router.get("/getcountries", (req, res) => {
  countryController.getCountries(req, res, db);
});

// Create product with file upload
router.post("/insert", uploadSingleImage, (req, res) => {
  countryController.createCountry(req, res, db);
});

module.exports = router;

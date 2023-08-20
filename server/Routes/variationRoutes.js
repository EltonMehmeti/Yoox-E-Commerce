// postmanRoutes.js
const express = require("express");
const router = express.Router();
const variationController = require("../controllers/variationController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/createvariation", (req, res) => {
  variationController.createVariation(req, res, db);
});

router.get("/getvariation", (req, res) => {
  variationController.getVariations(req, res, db);
});

// router.put("/update/:id", (req, res) => {
//   postmanController.updatePostman(req, res, db);
// });

router.delete("/delete/:id", (req, res) => {
  variationController.deleteVariation(req, res, db);
});

module.exports = router;

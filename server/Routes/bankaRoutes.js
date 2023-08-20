// categoryRoutes.js
const express = require("express");
const router = express.Router();
const bankaController = require("../controllers/bankaController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.get("/getBanka", (req, res) => {
  bankaController.fetchBanka(req, res, db);
});
router.post("/createBank", (req, res) => {
  bankaController.createBank(req, res, db);
});

router.delete("/delete", (req, res) => {
  bankaController.deleteBanka(req, res, db);
});

router.put("/update", (req, res) => {
  bankaController.updateBanka(req, res, db);
});
module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminCrudController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.get("/getadmins", (req, res) => {
  adminController.fetchAdmins(req, res, db);
});

router.post("/insert", (req, res) => {
  adminController.insertAdmin(req, res, db);
});

router.delete("/delete/:id", (req, res) => {
  adminController.deleteAdmin(req, res, db);
});

router.put("/update/:id", (req, res) => {
  adminController.updateAdmin(req, res, db);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/register", (req, res) => {
  adminController.registerAdmin(req, res, db);
});

router.get("/loginStatus", (req, res) => {
  adminController.loginStatusAdmin(req, res);
});

router.post("/login", (req, res) => {
  adminController.loginAdmin(req, res, db);
});

router.post("/logout", (req, res) => {
  adminController.logoutAdmin(req, res);
});

module.exports = router;

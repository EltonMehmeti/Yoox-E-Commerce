const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/register", (req, res) => {
  authController.register(req, res, db); // Pass the db connection to the register function
});

router.get("/loginStatus", (req, res) => {
  authController.loginStatus(req, res); // No need to pass db connection here as it's not used in loginStatus
});

router.post("/login", (req, res) => {
  authController.login(req, res, db); // Pass the db connection to the login function
});

router.post("/logout", (req, res) => {
  authController.logout(req, res); // No need to pass db connection here as it's not used in logout
});

module.exports = router;

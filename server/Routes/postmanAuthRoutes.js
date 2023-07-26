// postmanAuthRoutes.js
const express = require("express");
const router = express.Router();
const postmanController = require("../controllers/postmanAuthController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/register", (req, res) => {
  postmanController.registerPostman(req, res, db);
});

router.post("/login", (req, res) => {
  postmanController.loginPostman(req, res, db);
});
router.get("/loginStatus", (req, res) => {
  postmanController.loginStatus(req, res); // No need to pass db connection here as it's not used in loginStatus
});
router.post("/logout", (req, res) => {
  postmanController.logoutPostman(req, res);
});

module.exports = router;

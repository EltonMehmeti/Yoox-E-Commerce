const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentAuthController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/register", (req, res) => {
  agentController.registerAgent(req, res, db);
});

router.get("/loginStatus", (req, res) => {
  agentController.agentStatus(req, res);
});

router.post("/login", (req, res) => {
  agentController.loginAgent(req, res, db);
});

router.post("/logout", (req, res) => {
  agentController.logoutAgent(req, res);
});

module.exports = router;

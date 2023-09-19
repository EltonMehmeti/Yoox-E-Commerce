// agentsRoutes.js
const express = require("express");
const router = express.Router();
const agentsController = require("../controllers/agentsController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/create", (req, res) => {
  agentsController.createAgent(req, res, db);
});

router.get("/get", (req, res) => {
  agentsController.getAgents(req, res, db);
});

router.put("/update/:id", (req, res) => {
  agentsController.updateAgent(req, res, db);
});

router.delete("/delete/:id", (req, res) => {
  agentsController.deleteAgent(req, res, db);
});

module.exports = router;

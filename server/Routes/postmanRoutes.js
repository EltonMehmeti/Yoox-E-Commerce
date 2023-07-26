// postmanRoutes.js
const express = require("express");
const router = express.Router();
const postmanController = require("../controllers/postmanController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.post("/create", (req, res) => {
  postmanController.createPostman(req, res, db);
});

router.get("/get", (req, res) => {
  postmanController.getPostmen(req, res, db);
});

router.put("/update/:id", (req, res) => {
  postmanController.updatePostman(req, res, db);
});

router.delete("/delete/:id", (req, res) => {
  postmanController.deletePostman(req, res, db);
});

router.post("/orders", (req, res) => {
  postmanController.getPostmanOrders(req, res, db);
});
router.put("/updateStatus", (req, res) => {
  postmanController.updatePostmanStatus(req, res, db);
});
module.exports = router;

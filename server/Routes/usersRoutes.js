const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const db = require("../Config/dbConfig"); // Import the db connection here

router.get("/getusers", (req, res) => {
  usersController.fetchUsers(req, res, db);
});

router.post("/insert", (req, res) => {
  usersController.insertUser(req, res, db);
});

router.delete("/delete/:id", (req, res) => {
  usersController.deleteUser(req, res, db);
});

router.put("/update/:id", (req, res) => {
  usersController.updateUser(req, res, db);
});

module.exports = router;

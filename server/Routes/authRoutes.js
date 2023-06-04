const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Register User
router.post("/register", authController.register);

// Login User
router.post("/login", authController.login);
// Check if user is logged in
router.get("/api/loginStatus", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
module.exports = router;

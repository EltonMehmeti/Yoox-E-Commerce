const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const db = require("../Config/dbConfig");
// POST route to allow a user to leave a rating for a product
router.post("/ratings", (req, res) => {
  const { user_id, productId, rating } = req.body;

  // Ensure that the productId, user_id, and rating are valid values
  if (!productId || !user_id || !rating) {
    return res.status(400).json({ error: "Invalid request parameters." });
  }

  // Insert the product rating into the database
  const insertQuery = `INSERT INTO product_ratings (user_id, product_id, rating) VALUES (?, ?, ?)`;
  db.query(insertQuery, [user_id, productId, rating], (error, results) => {
    if (error) {
      console.error("Error submitting rating:", error);
      return res.status(500).json({ error: "Something went wrong." });
    }

    return res.status(201).json({ message: "Rating submitted successfully." });
  });
});

module.exports = router;

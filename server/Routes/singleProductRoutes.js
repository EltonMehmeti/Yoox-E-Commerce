const express = require("express");
const router = express.Router();
const db = require("../Config/dbConfig"); // Import the db connection here

// Single Product
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const q = "SELECT * FROM product WHERE Id=?;";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching the product.");
    } else {
      if (result.length === 0) {
        res.status(404).send("Product not found.");
      } else {
        // Map over the result and add the image URLs
        const productWithImages = {
          ...result[0],
          Img1: `/images/${result[0].Img1}`,
          Img2: `/images/${result[0].Img2}`,
          Img3: `/images/${result[0].Img3}`,
        };

        res.send(productWithImages);
      }
    }
  });
});

module.exports = router;

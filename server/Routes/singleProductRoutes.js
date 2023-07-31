const express = require("express");
const router = express.Router();
const db = require("../Config/dbConfig"); // Import the db connection here

// Single Product
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const q = `
  SELECT 
    p.*,
    cat.Name AS category_name,
    c.Image AS country_image
  FROM 
    product p
  LEFT JOIN 
    category cat ON p.CategoryId = cat.Id
  LEFT JOIN
    country c ON p.CountryId = c.Id
  WHERE
    p.Id = ?;`;

  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching the product.");
    } else {
      if (result.length === 0) {
        res.status(404).send("Product not found.");
      } else {
        const product = result[0];

        // Map over the result and add the image URLs
        const productWithImages = {
          ...product,
          Img1: `/images/${product.Img1}`,
          Img2: `/images/${product.Img2}`,
          Img3: `/images/${product.Img3}`,
          country_image: `/images/${product.country_image}`, // Add the country image URL
        };

        res.send(productWithImages);
      }
    }
  });
});

module.exports = router;

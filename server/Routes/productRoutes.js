const express = require("express");
const db = require("../Config/dbConfig");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up static file serving for images
router.use(
  "/images",
  express.static(path.join(__dirname, "..", "client", "src", "img"))
);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:\\Users\\px\\Desktop\\Lab-Project-Repo\\client\\src\\img");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the multer upload instance
const upload = multer({ storage });

// Fetch products
router.get("/admin/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      // Map over the result and add the image URLs
      const productsWithImages = result.map((product) => {
        return {
          ...product,
          Img1: `/images/${product.Img1}`,
          Img2: `/images/${product.Img2}`,
          Img3: `/images/${product.Img3}`,
        };
      });

      res.send(productsWithImages);
    }
  });
});

// Create product
router.post(
  "/api/insertProduct",
  upload.array("images", 3),
  async (req, res) => {
    try {
      const { name, desc, price, stock, category } = req.body;
      const images = req.files.map((file) => file.filename);

      const sqlInsert = `
      INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        name,
        desc,
        images[0],
        images[1],
        images[2],
        price,
        stock,
        category,
      ];

      db.query(sqlInsert, values, (err, result) => {
        if (err) {
          console.error("Error inserting product into database:", err);
          return res.status(500).json({ error: "Error uploading product." });
        }

        console.log("Product uploaded successfully.");
        res.sendStatus(200);
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

// Update product
router.put(
  "/api/updateProduct/:id",
  upload.array("images", 3),
  async (req, res) => {
    const id = Number(req.params.id);
    const { nameU, descU, priceU, stockU, categoryU } = req.body;
    const images = req.files.map((file) => file.filename);

    const updateQuery = `
    UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=?
    WHERE Id=?
  `;
    const values = [
      nameU,
      descU,
      images[0] || "", // If no image is provided, use an empty string
      images[1] || "",
      images[2] || "",
      priceU,
      stockU,
      categoryU,
      id,
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while updating the product.");
      } else {
        console.log("Product updated successfully.");

        res.send(result);
      }
    });
  }
);

// Delete product
router.delete("/api/deleteProduct/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Product WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting product");
    } else {
      console.log(`Deleted product with ID ${id}`);
      res.status(200).send("Product deleted successfully");
    }
  });
});

module.exports = router;

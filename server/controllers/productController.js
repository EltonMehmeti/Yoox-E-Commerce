const db = require("../Config/dbConfig");
const { deleteFiles } = require("../Helpers/fileUpload");

// FETCH PRODUCTS
exports.getProducts = (req, res, db) => {
  const getProductsWithRatingsQuery = `
    SELECT 
      p.*,
      IFNULL(AVG(pr.rating), 0) AS avg_rating
    FROM 
      product p
    LEFT JOIN 
      product_ratings pr ON p.Id = pr.product_id
    GROUP BY 
      p.Id;
  `;

  db.query(getProductsWithRatingsQuery, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      // Map over the result and add the image URLs
      const productsWithRatingsAndImages = result.map((product) => {
        return {
          ...product,
          Img1: `/images/${product.Img1}`,
          Img2: `/images/${product.Img2}`,
          Img3: `/images/${product.Img3}`,
        };
      });

      res.send(productsWithRatingsAndImages);
    }
  });
};

// Create product
exports.insertProduct = (req, res, db) => {
  try {
    // The uploadImages middleware will handle file uploads
    const { name, brand, desc, price, stock, category, countryId } = req.body;
    const images = req.files.map((file) => file.filename);

    const sqlInsert = `
      INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId,CountryId,Brand)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)
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
      countryId,
      brand,
    ];

    db.query(sqlInsert, values, (err, result) => {
      if (err) {
        console.error("Error inserting product into database:", err);
        deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error
        return res.status(500).json({ error: "Error uploading product." });
      }

      console.log("Product uploaded successfully.");
      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Update product
exports.updateProduct = (req, res, db) => {
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
      deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error
      res.status(500).send("An error occurred while updating the product.");
    } else {
      console.log("Product updated successfully.");
      res.send(result);
    }
  });
};

// Delete product
exports.deleteProduct = (req, res, db) => {
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
};

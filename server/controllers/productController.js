const { deleteFiles } = require("../Helpers/fileUpload");

// FETCH PRODUCTS
exports.getProducts = (req, res, db) => {
  const getProductsWithRatingsAndCountryImageQuery = `
    SELECT 
  p.Id,
  p.Name,
  p.Description,
  p.Img1,
  p.Img2,
  p.Img3,
  p.Price,
  p.Stock,
  p.CategoryId,
  p.CountryId,
  p.Brand,
  IFNULL(AVG(pr.rating), 0) AS avg_rating,
  c.Name AS country_name,
  CONCAT('/images/', c.Image) AS country_image,
  cat.Name AS category_name,
  (
    SELECT GROUP_CONCAT(vo.Id)
    FROM product_configuration pc
    INNER JOIN variation_option vo ON pc.VariationOptionId = vo.Id
    WHERE pc.ProductId = p.Id
  ) AS variation_option_ids,
  (
    SELECT GROUP_CONCAT(vo.value)
    FROM product_configuration pc
    INNER JOIN variation_option vo ON pc.VariationOptionId = vo.Id
    WHERE pc.ProductId = p.Id
  ) AS variation_option_values
FROM 
  product p
LEFT JOIN 
  product_ratings pr ON p.Id = pr.product_id
LEFT JOIN
  country c ON p.CountryId = c.Id
LEFT JOIN
  category cat ON p.CategoryId = cat.Id
GROUP BY
  p.Id,
  p.Name,
  p.Description,
  p.Img1,
  p.Img2,
  p.Img3,
  p.Price,
  p.Stock,
  p.CategoryId,
  p.CountryId,
  p.Brand,
  c.Name,
  c.Image,
  cat.Name; -- Group by product ID only
  `;

  db.query(getProductsWithRatingsAndCountryImageQuery, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      // Map over the result and add the image URLs for all three product images and country image
      const productsWithRatingsAndImages = result.map((product) => {
        return {
          ...product,
          Img1: `/images/${product.Img1}`,
          Img2: `/images/${product.Img2}`,
          Img3: `/images/${product.Img3}`,
          country_image: product.country_image
            ? product.country_image
            : "/images/default_country_image.png", // If country_image is null, provide a default image URL
          variation_options: product.variation_option_ids
            ? product.variation_option_ids.split(",").map((id, index) => ({
                id: parseInt(id),
                value: product.variation_option_values.split(",")[index],
              }))
            : [],
        };
      });

      res.send(productsWithRatingsAndImages);
    }
  });
};

// Create product
// exports.insertProduct = (req, res, db) => {
//   try {
//     // The uploadImages middleware will handle file uploads
//     const { name, brand, desc, price, stock, category, countryId } = req.body;
//     const images = req.files.map((file) => file.filename);

//     const sqlInsert = `
//       INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId,CountryId,Brand)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)
//     `;

//     const values = [
//       name,
//       desc,
//       images[0],
//       images[1],
//       images[2],
//       price,
//       stock,
//       category,
//       countryId,
//       brand,
//     ];

//     db.query(sqlInsert, values, (err, result) => {
//       if (err) {
//         console.error("Error inserting product into database:", err);
//         deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error
//         return res.status(500).json({ error: "Error uploading product." });
//       }

//       console.log("Product uploaded successfully.");
//       res.sendStatus(200);
//     });
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };
exports.insertProduct = (req, res, db) => {
  try {
    // The uploadImages middleware will handle file uploads
    const {
      name,
      brand,
      desc,
      price,
      stock,
      category,
      countryId,
      variationOptions,
    } = req.body;
    const images = req.files.map((file) => file.filename);
    const parsedVariationOptions = JSON.parse(variationOptions);
    const sqlInsertProduct = `
      INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId, CountryId, Brand)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valuesProduct = [
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

    db.query(sqlInsertProduct, valuesProduct, (err, result) => {
      if (err) {
        console.error("Error inserting product into database:", err);
        deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error
        return res.status(500).json({ error: "Error uploading product." });
      }

      console.log("Product uploaded successfully.");

      // Insert selected variation options into product_configuration table
      const productId = result.insertId; // Get the auto-generated ID of the inserted product

      if (parsedVariationOptions && parsedVariationOptions.length > 0) {
        const sqlInsertProductConfig = `
          INSERT INTO product_configuration (ProductId, VariationOptionId)
          VALUES ? 
        `;

        const valuesProductConfig = parsedVariationOptions.map((optionId) => [
          productId,
          optionId,
        ]);

        db.query(sqlInsertProductConfig, [valuesProductConfig], (err) => {
          if (err) {
            console.error("Error inserting product configuration:", err);
          }
        });
      }

      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Update product
// exports.updateProduct = (req, res, db) => {
//   const id = Number(req.params.id);
//   const { nameU, descU, priceU, stockU, categoryU, countryU, brandU } =
//     req.body;
//   const images = req.files.map((file) => file.filename);

//   const updateQuery = `
//     UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=?,CountryId=?,Brand=?
//   WHERE Id=?
//   `;
//   const values = [
//     nameU,
//     descU,
//     images[0] || "", // If no image is provided, use an empty string
//     images[1] || "",
//     images[2] || "",
//     priceU,
//     stockU,
//     categoryU,
//     countryU,
//     brandU,
//     id,
//   ];

//   db.query(updateQuery, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error
//       res.status(500).send("An error occurred while updating the product.");
//     } else {
//       console.log("Product updated successfully.");
//       res.send(result);
//     }
//   });
// };
exports.updateProduct = async (req, res, db) => {
  const id = Number(req.params.id);
  const {
    nameU,
    descU,
    priceU,
    stockU,
    categoryU,
    countryU,
    brandU,
    variationOptionsU,
  } = req.body;
  const images = req.files.map((file) => file.filename);

  const updateQuery = `
    UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=?, CountryId=?, Brand=?
    WHERE Id=?
  `;
  const values = [
    nameU,
    descU,
    images[0] || "",
    images[1] || "",
    images[2] || "",
    priceU,
    stockU,
    categoryU,
    countryU,
    brandU,
    id,
  ];

  try {
    // Start transaction
    await db.beginTransaction();

    // Delete existing variation options for the product
    const deleteProductConfigQuery = `
      DELETE FROM product_configuration WHERE ProductId = ?
    `;

    await db.query(deleteProductConfigQuery, [id]);
    console.log(variationOptionsU);
    // Insert selected variation options into product_configuration table
    if (variationOptionsU && variationOptionsU.length > 0) {
      const sqlInsertProductConfig = `
        INSERT INTO product_configuration (ProductId, VariationOptionId)
        VALUES (?, ?)
      `;

      for (const optionId of variationOptionsU) {
        const variationOptionId = parseInt(optionId, 10);
        await db.query(sqlInsertProductConfig, [id, variationOptionId]);
      }
    }

    // Update the product details
    await db.query(updateQuery, values);

    // Commit transaction
    await db.commit();

    console.log("Product updated successfully.");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    deleteFiles(req.files.map((file) => file.path)); // Delete uploaded files on error

    try {
      // Rollback on error
      await db.rollback();
    } catch (rollbackErr) {
      console.error("Error rolling back transaction:", rollbackErr);
    }

    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
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

exports.getVariationOptions = (req, res, db) => {
  const categoryId = req.body.categoryId;

  // Fetch the variation options associated with the selected category
  const sql = `
  select vo.*
  from category c inner join category_variation cv on c.Id =cv.CategoryId inner join variation v on v.Id = cv.VariationId inner join variation_option vo
  on v.Id = vo.variation_id
  where c.Id = ?
  `;

  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      console.error("Error fetching variation options:", err);
      res.status(500).json({ error: "Error fetching variation options" });
    } else {
      res.json(result);
    }
  });
};

exports.getProductsOfCurrentWeek = (req, res, db) => {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start date of the current week (Sunday)
  const currentWeekStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );

  // Calculate the end date of the current week (Saturday)
  const currentWeekEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + (6 - currentDate.getDay())
  );

  const getProductsWithRatingsAndCountryImageQuery = `
    SELECT 
      p.Id,
      p.Name,
      p.Description,
      p.Img1,
      p.Img2,
      p.Img3,
      p.Price,
      p.Stock,
      p.CategoryId,
      p.CountryId,
      p.Brand,
      IFNULL(AVG(pr.rating), 0) AS avg_rating,
      c.Name AS country_name,
      CONCAT('/images/', c.Image) AS country_image,
      cat.Name AS category_name,
      (
        SELECT GROUP_CONCAT(vo.Id)
        FROM product_configuration pc
        INNER JOIN variation_option vo ON pc.VariationOptionId = vo.Id
        WHERE pc.ProductId = p.Id
      ) AS variation_option_ids,
      (
        SELECT GROUP_CONCAT(vo.value)
        FROM product_configuration pc
        INNER JOIN variation_option vo ON pc.VariationOptionId = vo.Id
        WHERE pc.ProductId = p.Id
      ) AS variation_option_values
    FROM 
      product p
    LEFT JOIN 
      product_ratings pr ON p.Id = pr.product_id
    LEFT JOIN
      country c ON p.CountryId = c.Id
    LEFT JOIN
      category cat ON p.CategoryId = cat.Id
    WHERE
      p.CreatedAt BETWEEN ? AND ? -- Filter products within the current week
    GROUP BY
      p.Id,
      p.Name,
      p.Description,
      p.Img1,
      p.Img2,
      p.Img3,
      p.Price,
      p.Stock,
      p.CategoryId,
      p.CountryId,
      p.Brand,
      c.Name,
      c.Image,
      cat.Name;
  `;

  db.query(
    getProductsWithRatingsAndCountryImageQuery,
    [currentWeekStartDate, currentWeekEndDate],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // Map over the result and add the image URLs for all three product images and country image
        const productsWithRatingsAndImages = result.map((product) => {
          return {
            ...product,
            Img1: `/images/${product.Img1}`,
            Img2: `/images/${product.Img2}`,
            Img3: `/images/${product.Img3}`,
            country_image: product.country_image
              ? product.country_image
              : "/images/default_country_image.png", // If country_image is null, provide a default image URL
            variation_options: product.variation_option_ids
              ? product.variation_option_ids.split(",").map((id, index) => ({
                  id: parseInt(id),
                  value: product.variation_option_values.split(",")[index],
                }))
              : [],
          };
        });

        res.send(productsWithRatingsAndImages);
      }
    }
  );
};

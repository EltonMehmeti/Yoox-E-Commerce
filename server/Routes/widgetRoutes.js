const express = require("express");
const router = express.Router();
const db = require("../Config/dbConfig");

// count total users
router.get("/totalUsers", (req, res) => {
  const countQuery = "SELECT COUNT(*) as total_users FROM users;";
  db.query(countQuery, (err, result) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    res.json(result);
  });
});

// get countries
router.get("/getCountries", (req, res) => {
  const q = "SELECT * FROM country;";
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    res.json(result);
  });
});

// count total products
router.get("/totalProducts", (req, res) => {
  const countQuery = "SELECT COUNT(*) as total_products FROM product;";
  db.query(countQuery, (err, result) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    res.json(result);
  });
});

// get the new created users
router.get("/newUsers", (req, res) => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  ); // Get the first day of the week
  const q = `SELECT COUNT(*) AS newUsers FROM Users WHERE createdAt >= '${firstDayOfWeek.toISOString()}'`;
  // Execute the query
  db.query(q, (error, results) => {
    if (error) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    const newUsersCount = results[0].newUsers;
    res.json({ count: newUsersCount });
  });
});

// get the most sold product
router.get("/mostSold", (req, res) => {
  const q = `
    SELECT
      oi.item_id,
      p.Name AS product_name,
      SUM(oi.quantity) AS total_sold
    FROM
      OrderItems oi
      INNER JOIN Product p ON oi.item_id = p.Id
    GROUP BY
      oi.item_id, p.Name
    ORDER BY
      total_sold DESC
    LIMIT 1;
  `;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "No products found" });
      return;
    }

    const mostSoldProduct = results[0];
    res.json(mostSoldProduct);
  });
});

// get categories statistics
router.get("/categoriesStats", (req, res) => {
  const q = `
    SELECT
      c.Id AS CategoryId,
      c.Name AS CategoryName,
      COALESCE(SUM(oi.quantity), 0) AS TotalSold
    FROM
      Category c
      LEFT JOIN Product p ON c.Id = p.CategoryId
      LEFT JOIN OrderItems oi ON p.Id = oi.item_id
    GROUP BY
      c.Id, c.Name
    ORDER BY
      TotalSold DESC;
  `;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    res.json(results);
  });
});

// get highest rated product
router.get("/topproduct", (req, res) => {
  const q = `SELECT 
  p.*,
  IFNULL(AVG(pr.rating), 0) AS avg_rating,
  COUNT(pr.rating) AS total_ratings
FROM 
  product p
LEFT JOIN 
  product_ratings pr ON p.Id = pr.product_id
GROUP BY 
  p.Id
HAVING 
  COUNT(pr.rating) >= 3
ORDER BY 
  avg_rating DESC;

`;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    const productsWithRatingsAndImages = results.map((product) => {
      return {
        ...product,
        Img1: `/images/${product.Img1}`,
        Img2: `/images/${product.Img2}`,
        Img3: `/images/${product.Img3}`,
      };
    });
    res.send(productsWithRatingsAndImages);
  });
});

router.get("/bycountrysold", (req, res) => {
  const q = `      SELECT 
  c.Name AS CountryName,
  c.Image AS CountryImg,
  COUNT(oi.id) AS TotalProductsSold
FROM 
  country c
LEFT JOIN 
  product p ON c.Id = p.CountryId
LEFT JOIN 
  orderitems oi ON p.Id = oi.item_id
GROUP BY 
  c.Id, c.Name
ORDER BY 
  TotalProductsSold DESC;`;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).json({ error: "An error occurred" });
      return;
    }
    const withimages = results.map((country) => {
      return {
        ...country,
        CountryImg: `/images/${country.CountryImg}`,
      };
    });
    res.send(withimages);
  });
});

module.exports = router;

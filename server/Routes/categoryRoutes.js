const express = require("express");
const db = require("../Config/dbConfig");

const router = express.Router();

// Fetch Category
router.get("/admin/category", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

// Create Category
router.post("/api/insertCategory", async (req, res) => {
  try {
    const { name, img } = req.body;

    const sqlInsert = `
      INSERT INTO Category (Name,img)
      VALUES (?,?)
    `;

    const result = db.query(sqlInsert, [name, img]);

    console.log(result);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete Category
router.delete("/api/deleteCategory/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Category WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting category");
    } else {
      console.log(`Deleted category with ID ${id}`);
      res.status(200).send("Category deleted successfully");
    }
  });
});

// Update Category
router.put("/api/updateCategory/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nameU, imgU } = req.body;

  db.query(
    "UPDATE Category SET Name=?, Img=? WHERE Id=?",
    [nameU, imgU, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to update category");
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;

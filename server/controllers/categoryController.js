// categoryController.js

exports.fetchCategories = (req, res, db) => {
  db.query("SELECT * FROM Category", (err, result) => {
    if (err) {
      res.status(500).send({ error: "Error fetching categories" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.createCategory = (req, res, db) => {
  try {
    const { name, img } = req.body;

    const sqlInsert = `
        INSERT INTO Category (Name, img)
        VALUES (?, ?)
      `;

    db.query(sqlInsert, [name, img], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(result);
        res.sendStatus(200);
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.deleteCategory = (req, res, db) => {
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
};

exports.updateCategory = (req, res, db) => {
  const id = Number(req.params.id);
  const name = req.body.nameU;
  const imgU = req.body.imgU;

  db.query(
    "UPDATE Category SET Name=?, Img=? WHERE Id=?",
    [name, imgU, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to update category.");
      } else {
        res.send(result);
      }
    }
  );
};

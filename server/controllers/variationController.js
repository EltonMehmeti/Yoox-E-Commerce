// variationController.js

exports.createVariation = (req, res, db) => {
  try {
    const name = req.body.name;

    db.query(
      "INSERT INTO variation (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Value inserted!");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getVariations = (req, res, db) => {
  const SqlSelect = "SELECT * from variation";
  db.query(SqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.deleteVariation = (req, res, db) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM variation WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Variation is not deleted!");
    } else {
      console.log(`Deleted Variation with ID ${id}`);
      res.status(200).send("Variation deleted successfully");
    }
  });
};

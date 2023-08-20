exports.fetchBanka = (req, res, db) => {
  const sqlFetchCategories = `
    SELECT * from Banka58249;
    `;
  db.query(sqlFetchCategories, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Error fetching categories" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.createBank = (req, res, db) => {
  try {
    const name = req.body.name;

    db.query(
      "INSERT INTO Banka58249 (Emri58249) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted!");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
exports.deleteBanka = (req, res, db) => {
  const id = Number(req.body.id);
  db.query("DELETE FROM Banka58249 WHERE Id58249=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting Banka");
    } else {
      console.log(`Deleted Banka with ID ${id}`);
      res.status(200).send("Banka deleted successfully");
    }
  });
};

exports.updateBanka = (req, res, db) => {
  const id = Number(req.body.id);
  const nameU = req.body.nameU;

  db.query(
    "UPDATE Banka58249 SET Emri58249=? WHERE Id58249=?;",
    [nameU, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    }
  );
};

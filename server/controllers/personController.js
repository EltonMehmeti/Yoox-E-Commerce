exports.fetchPersoni = (req, res, db) => {
  const sqlFetchCategories = `
      SELECT * from Personi58249;
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

exports.createPersoni = (req, res, db) => {
  try {
    const name = req.body.name;

    db.query(
      "INSERT INTO Personi58249 (Emri58249,Mbiemri58249,Banka58249ID) VALUES (?,?,?)",
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
exports.deletePersoni = (req, res, db) => {
  const id = Number(req.body.id);
  db.query("DELETE FROM Personi58249 WHERE Id58249=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting Banka");
    } else {
      console.log(`Deleted Banka with ID ${id}`);
      res.status(200).send("Banka deleted successfully");
    }
  });
};

exports.updatePersoni = (req, res, db) => {
  const id = Number(req.body.id);
  const nameU = req.body.nameU;

  db.query(
    "UPDATE Personi58249 SET Emri58249=? WHERE Id58249=?;",
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

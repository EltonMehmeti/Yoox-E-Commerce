const express = require("express");
const db = require("../Config/dbConfig");

const router = express.Router();

// Insert Postman
router.post("/create", (req, res) => {
  try {
    const { name, lastname, phonenumber } = req.body;

    db.query(
      "INSERT INTO postman (Name, LastName, phonenumber) VALUES (?, ?, ?)",
      [name, lastname, phonenumber],
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.send("Values inserted!");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get Postmen
router.get("/postman", (req, res) => {
  const sqlSelect = "SELECT * FROM postman";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Update Postman
router.put("/api/updatePostman/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nameU, lastnameU, phonenumberU } = req.body;

  db.query(
    "UPDATE postman SET Name=?, LastName=?, phonenumber=? WHERE Id=?",
    [nameU, lastnameU, phonenumberU, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Postman
router.delete("/deletePostman/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM postman WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Postman is not deleted!");
    } else {
      console.log(`Deleted postman with ID ${id}`);
      res.status(200).send("Postman deleted successfully");
    }
  });
});

module.exports = router;

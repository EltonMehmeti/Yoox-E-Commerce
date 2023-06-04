const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../Config/dbConfig");

const router = express.Router();
const saltRounds = 10;

// Fetch the users
router.get("/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

// Insert User
router.post("/api/insert", async (req, res) => {
  try {
    const { name, email, password, address, city, phone, userType } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      const sqlInsert = `
        INSERT INTO Users (Name, Email, Password, Address, City, Phone, User_Type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sqlInsert,
        [name, email, hash, address, city, phone, userType],
        (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete User
router.delete("/api/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Users WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user");
    } else {
      console.log(`Deleted user with ID ${id}`);
      res.status(200).send("User deleted successfully");
    }
  });
});

// Update User
router.put("/api/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nameU, emailU, passwordU, addressU, cityU, phoneU, usertypeU } =
    req.body;

  bcrypt.hash(passwordU, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE Users SET Name=?, Email=?, Password=?, Address=?, City=?, Phone=?, User_Type=? WHERE Id=?",
      [nameU, emailU, hash, addressU, cityU, phoneU, usertypeU, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

module.exports = router;

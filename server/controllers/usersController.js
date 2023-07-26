const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.fetchUsers = (req, res, db) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    res.send(result);
  });
};

exports.insertUser = async (req, res, db) => {
  try {
    const { name, email, password, address, city, phone, userType } = req.body;
    const hash = await hashPassword(password);

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
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.deleteUser = (req, res, db) => {
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
};

exports.updateUser = (req, res, db) => {
  const id = Number(req.params.id);
  const { nameU, emailU, passwordU, addressU, cityU, phoneU, userTypeU } =
    req.body;
  hashPassword(passwordU)
    .then((hash) => {
      db.query(
        "UPDATE Users SET Name=?, Email=?, Password=?, Address=?, City=?, Phone=?, User_Type=? WHERE Id=?;",
        [nameU, emailU, hash, addressU, cityU, phoneU, userTypeU, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Helper function to hash passwords
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

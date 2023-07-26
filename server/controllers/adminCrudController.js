const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.fetchAdmins = (req, res, db) => {
  db.query("SELECT * FROM Admin", (err, result) => {
    if (err) {
      res.status(500).send({ error: "Error fetching admins" });
    } else {
      res.status(200).send(result);
    }
  });
};

exports.insertAdmin = async (req, res, db) => {
  try {
    const { username, email, password } = req.body;
    const hash = await hashPassword(password);

    const sqlInsert = `
      INSERT INTO Admin (Username, Email, Password)
      VALUES (?, ?, ?)
    `;

    db.query(sqlInsert, [username, email, hash], (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error inserting admin" });
      } else {
        res.sendStatus(200);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error inserting admin" });
  }
};

exports.deleteAdmin = (req, res, db) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Admin WHERE admin_id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Error deleting admin" });
    } else {
      console.log(`Deleted admin with ID ${id}`);
      res.sendStatus(200);
    }
  });
};

exports.updateAdmin = (req, res, db) => {
  const id = Number(req.params.id);
  const { username, email, password } = req.body;
  hashPassword(password)
    .then((hash) => {
      const sqlUpdate = `
        UPDATE Admin SET Username=?, Email=?, Password=? WHERE admin_id=?
      `;

      db.query(sqlUpdate, [username, email, hash, id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error updating admin" });
        } else {
          res.sendStatus(200);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Error updating admin" });
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

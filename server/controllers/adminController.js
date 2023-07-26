const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.registerAdmin = async (req, res, db) => {
  try {
    const { username, email, password } = req.body;
    const hash = await hashPassword(password);

    const sqlInsert = `
      INSERT INTO Admin (username, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(sqlInsert, [username, email, hash], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.loginStatusAdmin = (req, res) => {
  if (req.session.admin) {
    res.send({ loggedIn: true, admin: req.session.admin });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.loginAdmin = (req, res, db) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM Admin WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.admin = result[0];
          res.send(result[0]);
        } else {
          res.send({ message: "Wrong email/password combination!" });
        }
      });
    } else {
      res.send({ message: "Admin doesn't exist" });
    }
  });
};

exports.logoutAdmin = (req, res) => {
  if (req.session.admin) {
    req.session.destroy((err) => {
      if (err) {
        res.send({ message: "Error logging out" });
      } else {
        res.clearCookie("adminId");
        res.send({ message: "Logged out successfully" });
      }
    });
  } else {
    res.send({ message: "No admin logged in" });
  }
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

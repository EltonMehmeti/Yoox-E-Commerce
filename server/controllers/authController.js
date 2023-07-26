const bcrypt = require("bcrypt");
const saltRounds = 10;
// Register User
exports.register = async (req, res, db) => {
  try {
    const { name, email, password, address, city, phone, countryId } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      const sqlInsert = `
        INSERT INTO Users (Name, Email, Password, Address, City, Phone, CountryId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sqlInsert,
        [name, email, hash, address, city, phone, countryId],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          }

          console.log(result);
          return res.sendStatus(200);
        }
      );
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// Check if user is logged in
exports.loginStatus = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

// Login User
exports.login = (req, res, db) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  const sqlQuery = "SELECT * FROM Users WHERE Email = ?";
  const values = [email];

  db.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (error, response) => {
        if (error) {
          console.error(error);
          return res.sendStatus(500);
        }

        if (response) {
          req.session.user = result;
          return res.send(result);
        } else {
          return res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      return res.send({ message: "User doesn't exist" });
    }
  });
};

// Logout
exports.logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.send({ message: "Error logging out" });
      } else {
        res.clearCookie("userId");
        return res.send({ message: "Logged out successfully" });
      }
    });
  } else {
    return res.send({ message: "No user logged in" });
  }
};

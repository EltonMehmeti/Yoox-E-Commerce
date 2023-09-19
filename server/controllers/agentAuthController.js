const bcrypt = require("bcrypt");
const saltRounds = 10;

// Register Agent
exports.registerAgent = async (req, res, db) => {
  try {
    const { name, email, password, countryId } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      const sqlInsert = `
        INSERT INTO agents (Name, Email, Password, CountryId)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sqlInsert, [name, email, hash, countryId], (err, result) => {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }

        console.log(result);
        return res.sendStatus(200);
      });
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

// Check if agent is logged in
exports.agentStatus = (req, res) => {
  if (req.session.agent) {
    res.send({ loggedIn: true, agent: req.session.agent });
  } else {
    res.send({ loggedIn: false });
  }
};

// Login Agent
exports.loginAgent = (req, res, db) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  const sqlQuery = "SELECT * FROM agents WHERE Email = ?";
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
          req.session.agent = result;
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
exports.logoutAgent = (req, res) => {
  if (req.session.agent) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.send({ message: "Error logging out" });
      } else {
        res.clearCookie("agentId");
        return res.send({ message: "Logged out successfully" });
      }
    });
  } else {
    return res.send({ message: "No user logged in" });
  }
};

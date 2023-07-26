// postmanController.js

exports.registerPostman = (req, res, db) => {
  const { name, lastname, phonenumber } = req.body;

  const sqlInsert = `
      INSERT INTO Postman (Name, LastName, phonenumber)
      VALUES (?, ?, ?)
    `;

  db.query(sqlInsert, [name, lastname, phonenumber], (error, result) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    console.log(result);
    return res.sendStatus(200);
  });
};
// Check if user is logged in
exports.loginStatus = (req, res) => {
  if (req.session.postman) {
    res.send({ loggedIn: true, user: req.session.postman });
  } else {
    res.send({ loggedIn: false });
  }
};
exports.loginPostman = (req, res, db) => {
  const { name, phonenumber } = req.body;

  db.query(
    "SELECT * FROM Postman WHERE Name = ? and phonenumber = ?;",
    [name, phonenumber],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        req.session.postman = result[0];
        res.send(result[0]);
      } else {
        res.send({ message: "Postman doesn't exist" });
      }
    }
  );
};

exports.logoutPostman = (req, res) => {
  if (req.session.postman) {
    req.session.destroy((err) => {
      if (err) {
        res.send({ message: "Error logging out" });
      } else {
        res.clearCookie("postmanId");
        res.send({ message: "Logged out successfully" });
      }
    });
  } else {
    res.send({ message: "No postman logged in" });
  }
};

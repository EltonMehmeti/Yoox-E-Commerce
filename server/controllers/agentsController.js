const bcrypt = require("bcrypt");

exports.createAgent = async (req, res, db) => {
  try {
    const { name, email, password, countryId } = req.body;
    const hashedPassword = await hashPassword(password);

    const sqlInsert = `
      INSERT INTO Agents (Name, Email, Password, CountryId)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sqlInsert,
      [name, email, hashedPassword, countryId],
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

exports.getAgents = (req, res, db) => {
  const sqlSelect = "SELECT * FROM Agents";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(result);
    }
  });
};

exports.updateAgent = async (req, res, db) => {
  try {
    const agentId = Number(req.params.id);
    const { nameU, emailU, passwordU, countryIdU } = req.body;

    // Hash the new password before updating it in the database
    const hashedPassword = await hashPassword(passwordU);

    const sqlUpdate = `
      UPDATE Agents
      SET Name=?, Email=?, Password=?, CountryId=?
      WHERE agent_id=?
    `;

    db.query(
      sqlUpdate,
      [nameU, emailU, hashedPassword, countryIdU, agentId],
      (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.send("Agent updated successfully!");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.deleteAgent = (req, res, db) => {
  const agentId = Number(req.params.id);
  db.query("DELETE FROM Agents WHERE agent_id=?", agentId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Agent is not deleted!" });
    } else {
      console.log(`Deleted agent with ID ${agentId}`);
      res.status(200).send("Agent deleted successfully");
    }
  });
};

// Helper function to hash passwords
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

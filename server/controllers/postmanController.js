// postmanController.js

exports.createPostman = (req, res, db) => {
  try {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;

    db.query(
      "INSERT INTO postman (Name, LastName, phonenumber) VALUES (?,?,?)",
      [name, lastname, phonenumber],
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

exports.getPostmen = (req, res, db) => {
  const SqlSelect = "SELECT * from postman";
  db.query(SqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.updatePostman = (req, res, db) => {
  const id = Number(req.params.id);
  const nameU = req.body.nameU;
  const lastnameU = req.body.lastnameU;
  const phonenumberU = req.body.phonenumberU;
  db.query(
    "UPDATE postman SET Name=?, LastName=?, phonenumber=? WHERE Id=?",
    [nameU, lastnameU, phonenumberU, id],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.status(500).send("Error updating data");
      } else {
        res.send(result);
      }
    }
  );
};

exports.deletePostman = (req, res, db) => {
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
};

// postmanController.js

exports.getPostmanOrders = (req, res, db) => {
  const postmanId = req.body.postmanId; // Assuming you pass the postman ID as a parameter

  // Retrieve orders assigned to the postman with the given postmanId
  const sqlSelect = `
    SELECT
      Orders.id AS order_id,
      Orders.customer_email,
      Orders.order_date,
      GROUP_CONCAT(OrderItems.name SEPARATOR ', ') AS item_names,
      GROUP_CONCAT(OrderItems.quantity SEPARATOR ', ') AS item_quantity,
      SUM(OrderItems.quantity) AS total_quantity,
      SUM(OrderItems.price) AS total_price,
      Orders.shipping_status
    FROM Orders
    JOIN OrderItems ON Orders.id = OrderItems.order_id
    WHERE Orders.postman_id = ?
    GROUP BY Orders.id
    ORDER BY Orders.order_date DESC;
  `;

  db.query(sqlSelect, [postmanId], (error, results) => {
    if (error) {
      console.error("Error fetching orders for postman:", error);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    const orders = results.map((row) => ({
      order_id: row.order_id,
      customer_email: row.customer_email,
      order_date: row.order_date,
      item_names: row.item_names.split(", "),
      item_quantity: row.item_quantity.split(", "),
      total_quantity: row.total_quantity,
      total_price: row.total_price,
      shipping_status: row.shipping_status,
    }));

    res.json(orders);
  });
};
exports.updatePostmanStatus = (req, res, db) => {
  const { postmanId, status } = req.body;

  // Update the status of the postman in the database
  const sqlUpdate = "UPDATE postman SET status = ? WHERE Id = ?";
  db.query(sqlUpdate, [status, postmanId], (error, result) => {
    if (error) {
      console.error("Error updating postman status:", error);
      res.status(500).json({ error: "Failed to update postman status" });
    } else {
      console.log(`Postman with ID ${postmanId} status updated successfully`);
      res.status(200).json({ message: "Postman status updated successfully" });
    }
  });
};

// orderController.js

const db = require("../Config/dbConfig");

// Function to find an available postman
function findAvailablePostman(callback) {
  const findPostmanQuery = `SELECT Id FROM postman WHERE status = 'available' LIMIT 1`;

  db.query(findPostmanQuery, (err, result) => {
    if (err) {
      console.error("Error finding available postman:", err);
      callback(null); // Return null in case of error
      return;
    }

    if (result.length > 0) {
      const availablePostmanId = result[0].Id;
      callback(availablePostmanId); // Return the postman_id if available
    } else {
      callback(null); // Return null if no available postman found
    }
  });
}

function insertOrderData(customerEmail, address, items, userId) {
  const insertOrderQuery = `INSERT INTO Orders (customer_email, address, UserId, postman_id) VALUES (?, ?, ?, ?)`;

  // Call the function to find an available postman
  findAvailablePostman((postmanId) => {
    // postmanId contains the available postman_id if available, or null if not available

    // If no available postman found, postmanId will be null, so set it as NULL in the order data
    const orderData = [customerEmail, address, userId, postmanId];

    // Insert the order data into the Orders table
    db.query(insertOrderQuery, orderData, (err, orderResult) => {
      if (err) {
        console.error("Error inserting order data:", err);
        return;
      }

      const orderId = orderResult.insertId;

      const insertOrderItemsQuery = `INSERT INTO OrderItems (order_id, item_id, quantity, name, description, img1, img2, img3, price, stock, category_id) VALUES ?`;

      const orderItemsData = items.map((item) => [
        orderId,
        item.id,
        item.quantity,
        item.Name,
        item.Description,
        item.Img1,
        item.Img2,
        item.Img3,
        item.Price,
        item.Stock,
        item.CategoryId,
      ]);

      // Insert the order items into the OrderItems table
      db.query(insertOrderItemsQuery, [orderItemsData], (err) => {
        if (err) {
          console.error("Error inserting order items:", err);
          return;
        }

        console.log("Order data and items inserted successfully.");
      });
    });
  });
}

module.exports = {
  insertOrderData,
};

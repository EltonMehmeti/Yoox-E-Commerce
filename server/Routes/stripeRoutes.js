const express = require("express");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY");

const router = express.Router();

// Stripe checkout functionality
router.post("/checkout", async (req, res) => {
  // ... Your existing code for handling the Stripe checkout ...
  const { items, customerEmail, address } = req.body; // Retrieve items and customerEmail from the request body
  let lineItems = [];

  items.forEach((item) => {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.Name,
          description: item.Description,
        },
        unit_amount: Math.round(item.Price * 100),
      },
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/",
    customer_email: customerEmail, // Add customer's email to the checkout session
  });

  // Insert the order data into the database
  insertOrderData(customerEmail, address, items);

  res.send(JSON.stringify({ url: session.url }));
});

// Function to insert the order data into the database
function insertOrderData(customerEmail, address, items) {
  // ... Your existing code for inserting order data into the database ...
  const insertOrderQuery = `INSERT INTO Orders (customer_email, address) VALUES (?, ?)`;

  // Insert the order data into the Orders table
  db.query(insertOrderQuery, [customerEmail, address], (err, orderResult) => {
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
}

module.exports = router;

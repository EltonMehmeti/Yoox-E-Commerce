// stripe.js

const stripe = require("stripe")(
  "sk_test_51NBiUGDbbGVWjFGzO8hy2eeRGzMqDMSG6I4UX9iLF6WDQPE9ME0nLfDOkd1wF7XvSM1h9G92tZlathSUN7Cg3weZ00hgf7QWUP"
);

async function createCheckoutSession(items, customerEmail) {
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

  return session.url;
}

module.exports = {
  createCheckoutSession,
};

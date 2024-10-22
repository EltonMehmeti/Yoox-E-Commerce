const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");

const db = require("./Config/dbConfig");
const middlewares = require("./Middleware/middleware");
const http = require("http");
const server = http.createServer(app);
const stripe = require("./Middleware/stripe");
const orderController = require("./controllers/orderController");
const orderRoutes = require("./Routes/orderRoutes");
const authRoutes = require("./Routes/authRoutes");
const usersRoutes = require("./Routes/usersRoutes");
const singleProductRoutes = require("./Routes/singleProductRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const initializeSocket = require("./Middleware/socketManager");
const adminCrudRoutes = require("./Routes/adminCrudRoutes");
const postmanAuthRoutes = require("./Routes/postmanAuthRoutes");
const postmanRoutes = require("./Routes/postmanRoutes");
const agentAuthRoutes = require("./Routes/agentAuthRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/productRoutes");
const countryRoutes = require("./Routes/countryRoutes");
const widgetRoutes = require("./Routes/widgetRoutes");
const productRatingController = require("./controllers/productRatingController");
const variationRoutes = require("./Routes/variationRoutes");
const agentsRoutes = require("./Routes/agentsRoutes");
// Use middlewares
app.use(middlewares.jsonParser);
app.use(middlewares.corsMiddleware);
app.use(middlewares.cookieParserMiddleware);
app.use(middlewares.urlencodedParser);
app.use(middlewares.sessionMiddleware);

// Real time chat

initializeSocket(server);
server.listen(3002, () => {
  console.log("Server running");
});

// User's Auth
app.use("/api/", authRoutes);
// User's curd
app.use("/api/users", usersRoutes);

// Admin Auth
app.use("/api/admin", adminRoutes);

// Admin Crud
app.use("/api/crud", adminCrudRoutes);

// Postman Auth
app.use("/api/postmanAuth", postmanAuthRoutes);

// Postman Crud
app.use("/api/postman", postmanRoutes);
// Agent Auth
app.use("/api/agentAuth", agentAuthRoutes);
// Agent Crud
app.use("/api/agent", agentsRoutes);

// Category Crud
app.use("/api/category", categoryRoutes);

// Product Crud
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "client", "src", "img"))
);
app.use("/api/products", productRoutes);

// Single Product
app.use("/product", singleProductRoutes);

app.use("/country", countryRoutes);
// Stripe checkout functionality
app.post("/checkout", async (req, res) => {
  const { items, customerEmail, address, userId } = req.body;
  try {
    const sessionUrl = await stripe.createCheckoutSession(items, customerEmail);
    // Call the insertOrderData function to add the order data to the database
    orderController.insertOrderData(customerEmail, address, items, userId);
    res.send(JSON.stringify({ url: sessionUrl }));
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
});
// Orders
app.use("/api/orders", orderRoutes);
// Widget Stats
app.use("/api/widgets", widgetRoutes);

// Product rating
app.use("/product", productRatingController);
app.use("/api/variation", variationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

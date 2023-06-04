const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const postmanRoutes = require("./Routes/postmanRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/productRoutes"); // Import the productRoutes file
const stripeRoutes = require("./Routes/stripeRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const chatServer = require("./Helpers/chatServer");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: "elton",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/api", authRoutes);
app.use(userRoutes);
app.use(postmanRoutes);
app.use(categoryRoutes);
app.use(productRoutes); // Use the productRoutes as a router
app.use(stripeRoutes); // Use the stripeRoutes middleware
// Handle API routes for orders
app.use("/api/orders", orderRoutes);
// Run the chat server alongside your Express server
chatServer(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

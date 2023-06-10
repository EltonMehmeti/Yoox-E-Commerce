const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const multer = require("multer");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Lab-Project",
});
// Register User
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, address, city, phone } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      const sqlInsert = `
        INSERT INTO Users (Name, Email, Password, Address, City, Phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const result = db.query(sqlInsert, [
        name,
        email,
        hash,
        address,
        city,
        phone,
      ]);

      console.log(result);

      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Check if user its logged in
app.get("/api/loginStatus", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
// Login User
app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM Users WHERE Email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (error, response) => {
        if (response) {
          req.session.user = result;

          req.session.user = result;
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});
// logout
app.post("/api/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.send({ message: "Error logging out" });
      } else {
        res.clearCookie("userId");
        res.send({ message: "Logged out successfully" });
      }
    });
  } else {
    res.send({ message: "No user logged in" });
  }
});

// Fetch the users
app.get("/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    res.send(result);
  });
});

// Insert Users
app.post("/api/insert", async (req, res) => {
  try {
    const { name, email, password, address, city, phone, userType } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      const sqlInsert = `
        INSERT INTO Users (Name, Email, Password, Address, City, Phone,User_Type)
        VALUES (?, ?, ?, ?, ?, ?,?)
      `;

      const result = db.query(sqlInsert, [
        name,
        email,
        hash,
        address,
        city,
        phone,
        userType,
      ]);

      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// Delete
app.delete("/api/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Users WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting user");
    } else {
      console.log(`Deleted user with ID ${id}`);
      res.status(200).send("User deleted successfully");
    }
  });
});
app.put("/api/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const nameU = req.body.nameU;
  const emailU = req.body.emailU;
  const passwordU = req.body.passwordU;
  const addressU = req.body.addressU;
  const cityU = req.body.cityU;
  const phoneU = req.body.phoneU;
  const usetypeU = req.body.usertypeU;
  bcrypt.hash(passwordU, saltRounds, (err, hash) => {
    db.query(
      "UPDATE Users SET Name=?, Email=?, Password=?, Address=?, City=?, Phone=?, User_Type=? WHERE Id=?;",
      [nameU, emailU, hash, addressU, cityU, phoneU, usetypeU, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

//
// Set up static file serving for images
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "client", "src", "img"))
);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:\\Users\\px\\Desktop\\Lab-Project-Repo\\client\\src\\img");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the multer upload instance
const upload = multer({ storage });

// Fetch products
app.get("/admin/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      // Map over the result and add the image URLs
      const productsWithImages = result.map((product) => {
        return {
          ...product,
          Img1: `/images/${product.Img1}`,
          Img2: `/images/${product.Img2}`,
          Img3: `/images/${product.Img3}`,
        };
      });

      res.send(productsWithImages);
    }
  });
});

// Create product
app.post("/api/insertProduct", upload.array("images", 3), async (req, res) => {
  try {
    const { name, desc, price, stock, category } = req.body;
    const images = req.files.map((file) => file.filename);

    const sqlInsert = `
      INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      desc,
      images[0],
      images[1],
      images[2],
      price,
      stock,
      category,
    ];

    db.query(sqlInsert, values, (err, result) => {
      if (err) {
        console.error("Error inserting product into database:", err);
        return res.status(500).json({ error: "Error uploading product." });
      }

      console.log("Product uploaded successfully.");
      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update product
app.put(
  "/api/updateProduct/:id",
  upload.array("images", 3),
  async (req, res) => {
    const id = Number(req.params.id);
    const { nameU, descU, priceU, stockU, categoryU } = req.body;
    const images = req.files.map((file) => file.filename);

    const updateQuery = `
    UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=?
    WHERE Id=?
  `;
    const values = [
      nameU,
      descU,
      images[0] || "", // If no image is provided, use an empty string
      images[1] || "",
      images[2] || "",
      priceU,
      stockU,
      categoryU,
      id,
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while updating the product.");
      } else {
        console.log("Product updated successfully.");

        res.send(result);
      }
    });
  }
);
// Delete product
app.delete("/api/deleteProduct/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Product WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting product");
    } else {
      console.log(`Deleted product with ID ${id}`);
      res.status(200).send("Product deleted successfully");
    }
  });
});
// WIDGETS
// count total users
app.get("/api/totalUsers", (req, res) => {
  const countQuery = "SELECT COUNT(*) as total_users FROM users;";
  db.query(countQuery, (err, result) => {
    if (err) {
      res.send({ err });
      console.log(err);
    }
    res.send(result);
  });
});
// count total products
app.get("/api/totalProducts", (req, res) => {
  const countQuery = "SELECT COUNT(*) as total_products FROM product;";
  db.query(countQuery, (err, result) => {
    if (err) {
      res.send({ err });
      console.log(err);
    }
    res.send(result);
  });
});
// get the new created users
app.get("/api/getnewusers", (req, res) => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  ); // Get the first day of the week
  const q = `SELECT COUNT(*) AS newUsers FROM Users WHERE createdAt >= '${firstDayOfWeek.toISOString()}'`;
  // Execute the query
  db.query(q, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error fetching new users." });
    } else {
      const newUsersCount = results[0].newUsers;
      res.send({ count: newUsersCount });
    }
  });
});

// DASARAA

//INSERT postman
app.post("/create", (req, res) => {
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
    res.sendStatus("success");
  }
});
//get postmen
app.get("/postman", (req, res) => {
  const SqlSelect = "SELECT * from postman";
  db.query(SqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
//update postman
app.put("/api/updatePostman/:id", (req, res) => {
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
});

//delete postman
app.delete("/deletePostman/:id", (req, res) => {
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
});

// Jeta - Categories CRUD

// Fetch category

app.get("/admin/category", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

// Create category
app.post("/api/insertCategory", async (req, res) => {
  try {
    const { name, img } = req.body;

    const sqlInsert = `
        INSERT INTO Category (Name,img)
        VALUES (?,?)
      `;

    const result = db.query(sqlInsert, [name, img]);

    console.log(result);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete Category
app.delete("/api/deleteCategory/:id", (req, res) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Category WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting category");
    } else {
      console.log(`Deleted category with ID ${id}`);
      res.status(200).send(" deleted successfully");
    }
  });
});

// Update Category
app.put("/api/updateCategory/:id", (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.nameU;
  const imgU = req.body.imgU;

  db.query(
    "UPDATE Category SET Name=?, Img=? WHERE Id=?",
    [name, imgU, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to update category.");
      } else {
        res.send(result);
      }
    }
  );
});

// Single Prodcuts
app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const q = "SELECT * FROM product WHERE Id=?;";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching the product.");
    } else {
      if (result.length === 0) {
        res.status(404).send("Product not found.");
      } else {
        // Map over the result and add the image URLs
        const productWithImages = {
          ...result[0],
          Img1: `/images/${result[0].Img1}`,
          Img2: `/images/${result[0].Img2}`,
          Img3: `/images/${result[0].Img3}`,
        };

        res.send(productWithImages);
      }
    }
  });
});

// Real time chat
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// Create an empty array to store the room names

io.on("connection", (socket) => {
  const rooms = [];
  console.log("User connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    if (!rooms.includes(data)) {
      rooms.push(data);

      // Send the updated room list to all connected clients
      io.emit("room_list", rooms);
      console.log(rooms);
    }
    console.log(`User with ID: ${socket.id} joined room ${data}`);

    // Add the room name to the array if it doesn't already exist
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
  });
});

server.listen(3002, () => {
  console.log("Server running");
});

// stripee
// Key:   sk_test_51NBiUGDbbGVWjFGzO8hy2eeRGzMqDMSG6I4UX9iLF6WDQPE9ME0nLfDOkd1wF7XvSM1h9G92tZlathSUN7Cg3weZ00hgf7QWUP
// macbook :price_1NBiWJDbbGVWjFGzgwyFXMFM
// iphone: price_1NBiXtDbbGVWjFGz2lrpCbr5
// camera: price_1NBiYcDbbGVWjFGz5zNa6rKL

const stripe = require("stripe")(
  "sk_test_51NBiUGDbbGVWjFGzO8hy2eeRGzMqDMSG6I4UX9iLF6WDQPE9ME0nLfDOkd1wF7XvSM1h9G92tZlathSUN7Cg3weZ00hgf7QWUP"
);

// Stripe checkout functionality
app.post("/checkout", async (req, res) => {
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
// Orders List fetch
app.get("/api/orders", (req, res) => {
  const query = `
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
    GROUP BY Orders.id
    ORDER BY Orders.order_date DESC;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching order details:", error);
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
});
// delete all orders
app.delete("/deleteorders", (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // MySQL query to delete orders older than one week and their associated order items
  const formattedDate = oneWeekAgo.toISOString().slice(0, 19).replace("T", " ");
  const query = `
    DELETE Orders, OrderItems
    FROM Orders
    LEFT JOIN OrderItems ON Orders.id = OrderItems.order_id
    WHERE Orders.order_date < '${formattedDate}'
  `;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error deleting orders:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting orders" });
    } else {
      console.log("Orders and order items deleted successfully");
      res
        .status(200)
        .json({ message: "Orders and order items deleted successfully" });
    }
  });
});

// single order
app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;

  const query = `
  SELECT
  Orders.id AS order_id,
  Orders.customer_email,
  Orders.order_date,
  Orders.address,
  
  GROUP_CONCAT(OrderItems.img1 SEPARATOR ', ') AS item_images,
  GROUP_CONCAT(OrderItems.price SEPARATOR ', ') AS item_prices,
  GROUP_CONCAT(OrderItems.name SEPARATOR ', ') AS item_names,
  GROUP_CONCAT(OrderItems.quantity SEPARATOR ', ') AS item_quantity,
  SUM(OrderItems.quantity) AS total_quantity,
  SUM(OrderItems.price) AS total_price,
  Orders.shipping_status
FROM Orders
JOIN OrderItems ON Orders.id = OrderItems.order_id
WHERE Orders.id = ?
GROUP BY Orders.id;
  `;

  db.query(query, [orderId], (error, results) => {
    if (error) {
      console.error("Error fetching order details:", error);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const row = results[0];
    const order = {
      order_id: row.order_id,
      customer_email: row.customer_email,
      address: row.address,
      order_date: row.order_date,
      item_images: row.item_images.split(", "),
      item_prices: row.item_prices.split(", "),
      item_names: row.item_names.split(", "),
      item_quantity: row.item_quantity.split(", "),
      total_quantity: row.total_quantity,
      total_price: row.total_price,
      shipping_status: row.shipping_status,
    };
    console.log(order);
    res.json(order);
  });
});

// update shipping status
app.put("/api/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const { shippingStatus } = req.body;

  // Update the shipping status in the database
  const query = "UPDATE Orders SET shipping_status = ? WHERE id = ?";
  db.query(query, [shippingStatus, orderId], (error, results) => {
    if (error) {
      console.error("Error updating shipping status:", error);
      res.status(500).json({ error: "Failed to update shipping status" });
    } else {
      console.log("Shipping status updated successfully");
      res.status(200).json({ message: "Shipping status updated successfully" });
    }
  });
});

app.post("/api/orders/track", (req, res) => {
  const customerEmail = req.body.customerEmail; // Retrieve the logged-in user's email

  const query = `
    SELECT
      Orders.id AS order_id,
      Orders.customer_email,
      Orders.order_date,
      Orders.address,
      GROUP_CONCAT(OrderItems.img1 SEPARATOR ', ') AS item_images,
      GROUP_CONCAT(OrderItems.price SEPARATOR ', ') AS item_prices,
      GROUP_CONCAT(OrderItems.name SEPARATOR ', ') AS item_names,
      GROUP_CONCAT(OrderItems.quantity SEPARATOR ', ') AS item_quantity,
      SUM(OrderItems.quantity) AS total_quantity,
      SUM(OrderItems.price) AS total_price,
      Orders.shipping_status
    FROM Orders
    JOIN OrderItems ON Orders.id = OrderItems.order_id
    WHERE Orders.customer_email = ?
    GROUP BY Orders.id;
  `;

  db.query(query, [customerEmail], (error, results) => {
    if (error) {
      console.error("Error fetching order details:", error);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "No orders found" });
      return;
    }

    const orders = results.map((row) => ({
      order_id: row.order_id,
      customer_email: row.customer_email,
      address: row.address,
      order_date: row.order_date,
      item_images: row.item_images.split(", "),
      item_prices: row.item_prices.split(", "),
      item_names: row.item_names.split(", "),
      item_quantity: row.item_quantity.split(", "),
      total_quantity: row.total_quantity,
      total_price: row.total_price,
      shipping_status: row.shipping_status,
    }));

    res.json(orders);
  });
});
//mostsold
app.get("/mostsold", (req, res) => {
  const q = `
    SELECT
      oi.item_id,
      p.Name AS product_name,
      SUM(oi.quantity) AS total_sold
    FROM
      OrderItems oi
      INNER JOIN Product p ON oi.item_id = p.Id
    GROUP BY
      oi.item_id, p.Name
    ORDER BY
      total_sold DESC
    LIMIT 1;
  `;

  db.query(q, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "An error occurred while fetching the most sold product.",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }

    const mostSoldProduct = results[0];
    res.json(mostSoldProduct);
  });
});

app.listen(3001, () => {
  console.log("Running server");
});

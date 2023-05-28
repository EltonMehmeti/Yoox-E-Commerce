const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const multer = require("multer");

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

// Fetch the users
app.get("/admin/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});
// Create
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

      console.log(result);

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
// \fetch postman's
app.get("/admin/postman", (req, res) => {
  db.query("SELECT * FROM postman", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

// Fetch products
app.get("/admin/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});
// Create product
app.post("/api/insertProduct", async (req, res) => {
  try {
    const { name, desc, img1, img2, img3, price, stock, category } = req.body;

    const sqlInsert = `
        INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId)
        VALUES (?, ?, ?, ?, ?, ?,?,?)
      `;

    const result = db.query(sqlInsert, [
      name,
      desc,
      img1,
      img2,
      img3,
      price,
      stock,
      category,
    ]);

    console.log(result);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
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
// Update product
app.put("/api/updateProduct/:id", (req, res) => {
  const id = Number(req.params.id);
  const nameU = req.body.nameU;
  const descU = req.body.descU;
  const img1U = req.body.img1U;
  const img2U = req.body.img2U;
  const img3U = req.body.img3U;
  const priceU = req.body.priceU;
  const stockU = req.body.stockU;
  const categoryU = req.body.categoryU;

  db.query(
    "UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=? WHERE Id=?;",
    [nameU, descU, img1U, img2U, img3U, priceU, stockU, categoryU, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
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
app.get("/postman", (req, res) => {
  db.query("SELECT * FROM postman", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});
// create postman
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

// Fetch products
app.get("/admin/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

// Create product
app.post("/api/insertProduct", async (req, res) => {
  try {
    const { name, desc, img1, img2, img3, price, stock, category } = req.body;

    const sqlInsert = `
        INSERT INTO Product (Name, Description, Img1, Img2, Img3, Price, Stock, CategoryId)
        VALUES (?, ?, ?, ?, ?, ?,?,?)
      `;

    const result = db.query(sqlInsert, [
      name,
      desc,
      img1,
      img2,
      img3,
      price,
      stock,
      category,
    ]);

    console.log(result);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
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
// Update product
app.put("/api/updateProduct/:id", (req, res) => {
  const id = Number(req.params.id);
  const nameU = req.body.nameU;
  const descU = req.body.descU;
  const img1U = req.body.img1U;
  const img2U = req.body.img2U;
  const img3U = req.body.img3U;
  const priceU = req.body.priceU;
  const stockU = req.body.stockU;
  const categoryU = req.body.categoryU;

  db.query(
    "UPDATE Product SET Name=?, Description=?, Img1=?, Img2=?, Img3=?, Price=?, Stock=?, CategoryId=? WHERE Id=?;",
    [nameU, descU, img1U, img2U, img3U, priceU, stockU, categoryU, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

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
//
app.get("/admin/category", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

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
  const q = "Select * from product where Id=?;";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
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

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.Name,
          description: item.Description,
          // images: [item.Img1, item.Img2, item.Img3],
        },
        unit_amount: Math.round(item.Price * 100),
      },
      quantity: item.quantity, // Include the quantity property
    });
    console.log("Your cart items: " + JSON.stringify(items));
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/signin",
  });

  res.send(JSON.stringify({ url: session.url }));
});
app.get("/api/payments", async (req, res) => {
  try {
    // Fetch payments from Stripe API
    const payments = await stripe.charges.list();

    // Extract item information from payments and populate checkoutSummary
    const checkoutSummary = {
      customer: "", // Set the customer value accordingly
      items: [],
      totalAmount: 0,
    };

    payments.data.forEach((payment) => {
      const item = {
        name: payment.description, // Set the item name accordingly
        quantity: payment.quantity, // Use the quantity value from payment
        unitPrice: payment.unit_price, // Format the unit price as desired
        amount: formatPrice(payment.amount), // Format the amount as desired
      };

      checkoutSummary.items.push(item);
      checkoutSummary.totalAmount += payment.amount;
    });

    res.json(checkoutSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }

});
function formatPrice(amount) {
  return (amount / 100).toFixed(2) + " $"; // Format the amount as USD
}

// balance


});

app.listen(3001, () => {
  console.log("Running server");
});

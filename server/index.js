const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");

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

          console.log(req.session);
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
    ;
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

app.listen(3001, () => {
  console.log("Running server");
});

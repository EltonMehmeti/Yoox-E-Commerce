const db = require("../Config/dbConfig");
const bcrypt = require("../utils/bcryptUtils");

const userModel = {
  getUsers: (callback) => {
    const query = "SELECT * FROM Users";
    db.query(query, callback);
  },

  createUser: (userData, callback) => {
    const { name, email, password, address, city, phone, userType } = userData;
    const query =
      "INSERT INTO Users (Name, Email, Password, Address, City, Phone, User_Type) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, password, address, city, phone, userType];
    db.query(query, values, callback);
  },

  deleteUser: (userId, callback) => {
    const query = "DELETE FROM Users WHERE Id = ?";
    db.query(query, [userId], callback);
  },

  updateUser: (userId, userData, callback) => {
    const { name, email, password, address, city, phone, userType } = userData;
    const query =
      "UPDATE Users SET Name = ?, Email = ?, Password = ?, Address = ?, City = ?, Phone = ?, User_Type = ? WHERE Id = ?";
    const values = [
      name,
      email,
      password,
      address,
      city,
      phone,
      userType,
      userId,
    ];
    db.query(query, values, callback);
  },

  getUserByEmail: (email, callback) => {
    const query = "SELECT * FROM Users WHERE Email = ?";
    db.query(query, [email], callback);
  },
};

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, address, city, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password);

    const result = await userModel.createUser({
      name,
      email,
      password: hashedPassword,
      address,
      city,
      phone,
    });

    console.log(result);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Login User
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModel.getUserByEmail(email, async (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (result.length > 0) {
        const isPasswordMatched = await bcrypt.compare(
          password,
          result[0].password
        );

        if (isPasswordMatched) {
          req.session.user = result;
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  });
};

module.exports = {
  userModel,
  register,
  login,
};

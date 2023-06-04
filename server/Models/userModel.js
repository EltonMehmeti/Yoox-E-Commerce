const db = require("../Config/dbConfig");

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
    console.log("Email:", email); // Add this line
    const query = "SELECT * FROM Users WHERE Email = ?";
    db.query(query, [email], (err, result) => {
      console.log("Result:", result); // Add this line
      callback(err, result);
    });
  },
};

module.exports = userModel;

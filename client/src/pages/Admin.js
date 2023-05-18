import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
const Admin = () => {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.user[0].Name);
        setUsername(response.data.user[0].Name);
      }
    });
  }, []);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/totalUsers"),
      axios.get("http://localhost:3001/api/totalProducts"),
      axios.get("http://localhost:3001/api/getnewusers"),
    ]).then(([totalUsersResponse, ordersResponse, newUsersTotal]) => {
      console.log(totalUsersResponse.data[0].total_users);
      setTotalUsers(totalUsersResponse.data[0].total_users);
      console.log(ordersResponse.data[0].total_products);
      setTotalProducts(ordersResponse.data[0].total_products);
      console.log(newUsersTotal);
      console.log(newUsersTotal.data.count);
      setNewUsers(newUsersTotal.data.count);
    });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (!response.data.loggedIn) {
        navigate("/signin");
      } else if (response.data.user[0].User_Type !== "Admin") {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar username={username} />
      <Widgets
        users={totalUsers}
        products={totalProducts}
        newUsers={newUsers}
      />
    </div>
  );
};

export default Admin;

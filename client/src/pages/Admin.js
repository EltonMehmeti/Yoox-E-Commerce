import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Widgets from "../components/admin/Widgets";
const Admin = () => {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [categoriesStats, setCategoriesStats] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.user[0].Name);
        setUsername(response.data.user[0].Name);
      }
    });

    axios.get("http://localhost:3001/categoriesStats").then((response) => {
      setCategoriesStats(response.data);
      console.log(response.data);
      console.log("eklton");
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
  const data = categoriesStats.map((category) => ({
    name: category.CategoryName, // Assuming CategoryName represents the name of the category
    totalSold: category.TotalSold, // Assuming TotalSold represents the count of sold products
  }));
  console.log(data);
  return (
    <div className="flex h-screen">
      <Sidebar username={username} />
      <div className="flex flex-col items-center w-full  gap-20 justify-center">
        <Widgets
          users={totalUsers}
          products={totalProducts}
          newUsers={newUsers}
        />
        <h1>Categories Stats</h1>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSold" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Admin;

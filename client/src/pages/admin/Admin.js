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
import Sidebar from "../../components/admin/Sidebar";
import Widgets, { SideWidget } from "../../components/admin/Widgets";
const Admin = () => {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [categoriesStats, setCategoriesStats] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/admin/loginStatus")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setUsername(response.data.admin.username);
        }
      });

    axios
      .get("http://localhost:3001/api/widgets/categoriesStats")
      .then((response) => {
        setCategoriesStats(response.data);
      });
  }, []);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/widgets/totalUsers"),
      axios.get("http://localhost:3001/api/widgets/totalProducts"),
      axios.get("http://localhost:3001/api/widgets/newUsers"),
      axios.get("http://localhost:3001/api/widgets/topproduct"),
    ]).then(
      ([totalUsersResponse, ordersResponse, newUsersTotal, topProductsRes]) => {
        setTotalUsers(totalUsersResponse.data[0].total_users);

        setTotalProducts(ordersResponse.data[0].total_products);

        setNewUsers(newUsersTotal.data.count);
        setTopProducts(topProductsRes.data);
      }
    );
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/admin/loginStatus")
      .then((response) => {
        if (!response.data.loggedIn) {
          navigate("/adminlogin");
        }
      });
  }, []);
  const data = categoriesStats.map((category) => ({
    name: category.CategoryName, // Assuming CategoryName represents the name of the category
    totalSold: category.TotalSold, // Assuming TotalSold represents the count of sold products
  }));

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
        <div className="flex flex-row gap-4 justify-center items-center w-full">
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
          <div>
            <h1 className="mb-4 font-bold text-lg text-gray-600">
              Top Rated Products
            </h1>
            <SideWidget products={topProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

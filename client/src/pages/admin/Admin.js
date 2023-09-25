import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import { BarChart, Bar, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoTrophySharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Widgets, {
  CountryW,
  MidWidgets,
  SideWidget,
} from "../../components/admin/Widgets";
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
  const [soldbycountry, setSoldByCountry] = useState([]);
  const [userProgressData, setUserProgressData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState("");
  const [mostSold, setMostSold] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/widgets/totalUsers"),
      axios.get("http://localhost:3001/api/widgets/totalProducts"),
      axios.get("http://localhost:3001/api/widgets/newUsers"),
      axios.get("http://localhost:3001/api/widgets/topproduct"),
      axios.get("http://localhost:3001/api/widgets/bycountrysold"),
      axios.get("http://localhost:3001/api/widgets/userProgressData"),
      axios.get("http://localhost:3001/api/widgets/totalEarnings"),
      axios.get("http://localhost:3001/api/widgets/mostsold"),
    ]).then(
      ([
        totalUsersResponse,
        ordersResponse,
        newUsersTotal,
        topProductsRes,
        soldbycountries,
        userProg,
        totalEarn,
        mostSoldResponse,
      ]) => {
        setTotalUsers(totalUsersResponse.data[0].total_users);
        setTotalProducts(ordersResponse.data[0].total_products);
        setNewUsers(newUsersTotal.data.count);
        setTopProducts(topProductsRes.data);
        setSoldByCountry(soldbycountries.data);
        setUserProgressData(userProg.data);
        setTotalEarnings(totalEarn.data[0].total_earnings);
        setMostSold(mostSoldResponse.data.product_name);
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
  const formatXAxisTick = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="flex h-auto bg-gray-100">
      <Sidebar username={username} />
      <div className="flex flex-col items-center w-full  gap-20 justify-center">
        <Widgets
          users={totalUsers}
          products={totalProducts}
          newUsers={newUsers}
        />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-20 ">
            {/* <MidWidgets
              title={"Total Earnings"}
              value={"$" + totalEarnings}
              // icon={<MdOutlineAccountBalanceWallet fill="#5fd8b9" size={32} />}
            /> */}
            {/* <MidWidgets
              title={"Most Sold"}
              value={mostSold}
              icon={<IoTrophySharp fill="#5fd8b9" size={32} />}
            /> */}
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-xl  p-4 m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <h2 className="font-bold text-gray-400">
              User Registration Progress
            </h2>
            <LineChart width={800} height={300} data={userProgressData}>
              <XAxis
                tickFormatter={formatXAxisTick}
                dataKey="registration_date"
              />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="registration_count"
                stroke="#8884d8"
              />
            </LineChart>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center w-full">
          <div>
            <h1 className="mb-4 font-bold text-lg text-gray-600">
              Products sold by Country
            </h1>
            <CountryW items={soldbycountry} />
          </div>

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

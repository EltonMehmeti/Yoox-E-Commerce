import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Widgets from "../components/admin/Widgets";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import CanvasJSReact from "@canvasjs/react-charts";
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
  const options = {
    theme: "",
    animationEnabled: true,
    exportFileName: "New Year Resolutions",
    exportEnabled: true,
    title: {
      text: "Orders Shipping Status",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        // indexLabelPlacement: "inside",
        dataPoints: [
          { y: 12, label: "Packing" },
          { y: 32, label: "Pending" },
          { y: 43, label: "Delivered" },
        ],
      },
    ],
  };

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  return (
    <div className="flex h-screen">
      <Sidebar username={username} />
      <div className="flex h-screen flex-col  items-center w-full ml-20">
        <Widgets
          users={totalUsers}
          products={totalProducts}
          newUsers={newUsers}
        />
        <div className=" self-baseline justify-self-end w-full justify-center items-center flex-row flex mt-20   h-100 p-4">
          <div className="w-1/3">
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center ">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="p-4 rounded-full bg-[#ebfaf2] border">
                    <MdOutlineAccountBalanceWallet fill="#5fd8b9" size={40} />
                  </span>
                  <div className="ml-4">
                    <p className="font-bold text-gray-400">Earnings</p>
                    <p className="text-2xl mt-2"></p>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                >
                  <BsCurrencyDollar />
                </button>
              </div>
              <div className="mt-6">
                <button color="white" text="Download" borderRadius="10px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { useModal } from "react-hooks-use-modal";
import Swal from "sweetalert2";
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

  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/totalUsers").then((response) => {
  //     console.log(response.data[0].total_users);
  //     setTotalUsers(response.data[0].total_users);
  //   });
  // }, []);
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/totalUsers"),
      axios.get("http://localhost:3001/api/totalProducts"),
    ]).then(([totalUsersResponse, ordersResponse]) => {
      console.log(totalUsersResponse.data[0].total_users);
      setTotalUsers(totalUsersResponse.data[0].total_users);
      console.log(ordersResponse.data[0].total_products);
      setTotalProducts(ordersResponse.data[0].total_products);
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
      <Widgets users={totalUsers} products={totalProducts} />
    </div>
  );
};

export default Admin;

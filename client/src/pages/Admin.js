import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { useModal } from "react-hooks-use-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Admin = () => {
  axios.defaults.withCredentials = true;

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
      <Sidebar />
    </div>
  );
};

export default Admin;

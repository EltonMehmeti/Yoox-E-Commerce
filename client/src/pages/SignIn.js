import React, { useEffect, useState } from "react";
import logo from "../img/loginFigure.png";
import logo1 from "../img/logo2.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else if (response.data[0].User_Type == "User") {
          navigate("/");
          setLoginStatus(response.data[0].Name);
        } else if (response.data[0].User_Type == "Admin") {
          navigate("/admin");
          setLoginStatus(response.data[0].Name);
        } else if (response.data[0].User_Type == "CS") {
          navigate("/costumerS");
          setLoginStatus(response.data[0].Name);
        }
      });
  };

  return (
    <div className="h-screen w-full flex bg-orange-50">
      <div className=" grid grid-cols-1 md:grid-cols-2 m-auto  shadow-lg bg-orange-50 sm:max-w-[1000px] rounded-lg">
        <div className="w-full h-[550px] hidden md:block  ">
          <img className="w-full h-full " src={logo} />
        </div>
        <form className="  max-w-[350px] h-[500px] w-full rounded-lg mx-auto bg-orange-50   p-7">
          <div className="w-16 ">
            <img className="rounded-lg " src={logo1} />
          </div>
          <h6>Welcome back!</h6>
          <h2 className="text-4xl font-bold text-center  py-5">Sign in</h2>
          <div className="flex flex-col py-2 mb-4">
            <label>Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              className=" border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-50 border p-2  relative  "
              type="text"
              placeholder="user@gmail.com"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              className=" py-2  relative bg-orange-50 rounded-md  border border-transparent shadow-lg shadow-gray-300 "
              type="password"
              placeholder="********"
            />
          </div>
          <button
            onClick={login}
            className=" w-full bg-orange-500 hover:bg-orange-600 border-2 text-white   border-transparent rounded-lg my-6 py-2"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center text-xs ">{loginStatus}</p>
            <p className="text-xs text-gray-400">
              I don't have an account?{" "}
              <button
                className="text-orange-500 text-xs"
                onClick={() => navigate("/signup")}
              >
                {" "}
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

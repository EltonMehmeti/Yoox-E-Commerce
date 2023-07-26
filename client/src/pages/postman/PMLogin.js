import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PMLogin = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/postmanAuth/login", {
        name: name,
        phonenumber: phoneNumber,
      })
      .then((response) => {
        if (response.data.message) {
          // Login failed
          setLoginStatus(response.data.message);
        } else {
          // Login successful
          navigate("/shipping"); // Redirect to admin dashboard
          setLoginStatus("Login successful!");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginStatus("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <section className="bg-gray-50 h-screen flex items-center justify-center dark:bg-gray-900">
        {/* ... */}
        <form className="space-y-4 md:space-y-6 " onSubmit={login}>
          <h1 className="bold  text-lg">Postman SignIn</h1>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              // Add any other input attributes you need (e.g., placeholder, required, etc.)
              className="..."
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              // Add any other input attributes you need (e.g., placeholder, required, etc.)
              className="..."
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Sign In
          </button>
          {/* ... */}
        </form>
        {loginStatus}
      </section>
    </div>
  );
};

export default PMLogin;

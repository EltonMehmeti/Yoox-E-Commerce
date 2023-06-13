import React, { useEffect, useState } from "react";
import logo from "../img/logo1.png";
import Cart from "./Cart";
import Logo from "../img/logo2.png";
import { AiOutlineLogin } from "react-icons/ai";
import { CartContext } from "../pages/CartContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const handleSignOut = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/logout");
      if (response.data.message === "Logged out successfully") {
        // Clear session or local storage if necessary
        localStorage.removeItem("accessToken"); // Example: remove access token from local storage
        navigate("/signin");
      } else {
        // Handle error or display a message
        console.log("Logout failed:", response.data.message);
        // Display an error message to the user
      }
    } catch (error) {
      // Handle error or display a message
      console.log("Logout error:", error);
      // Display an error message to the user
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        setUsername(response.data.user[0].Name);
        console.log(username);
      }
    });
  }, []);
  return (
    <nav class="bg-[#24292F] top-0   border-gray-200 dark:bg-gray-900 sticky z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="http://localhost:3000/" class="flex items-center">
          <img src={Logo} class="h-8 mr-3" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black text-white">
            YOoX
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:border-gray-700">
            <li>
              <a
                href="http://localhost:3000"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li
              onClick={() => {
                const ele = document.getElementById("products");
                setTimeout(() => {
                  ele?.scrollIntoView({ behavior: "smooth" });
                }, 0);
              }}
            >
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/aboutus"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/contact"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              {username ? (
                <div className="relative">
                  <button
                    id="dropdownDelayButton"
                    className="text-white  text-center font-medium rounded-lg text-sm px-4   inline-flex items-center "
                    type="button"
                    onClick={handleToggleDropdown}
                    onMouseEnter={handleMouseEnter}
                  >
                    {username}{" "}
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div
                      id="dropdownDelay"
                      className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 top-full mt-2"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li className=" cursor-pointer">
                          <a
                            href="http://localhost:3000/trackorder"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Track Orders
                          </a>
                        </li>
                        <li className=" cursor-pointer">
                          <a
                            onClick={handleSignOut}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="http://localhost:3000/signin"
                  class="flex flex-row items-center justify-center text-center  py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <p>Sign In </p> <AiOutlineLogin />
                </a>
              )}
            </li>
            <li>
              <span
                href=""
                class=" cursor-pointer block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <Cart />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

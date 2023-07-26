import React, { useState } from "react";
import axios from "axios";

const PMSignup = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform client-side validation
    if (!name || !lastname || !phonenumber) {
      setMessage("All fields are required.");
      return;
    }

    // If client-side validation passes, send data to the backend API
    axios
      .post("http://localhost:3001/api/postmanAuth/register", {
        name: name,
        lastname: lastname,
        phonenumber: phonenumber,
      })
      .then((response) => {
        // Handle success
        setMessage("Account created successfully.");
      })
      .catch((error) => {
        // Handle error
        setMessage("Error creating account. Please try again later.");
      });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* Rest of your UI */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Last Name
              </label>
              <input
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                type="text"
                name="lastname"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Last Name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="phonenumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Phone Number
              </label>
              <input
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                }}
                type="number"
                name="phonenumber"
                id="phonenumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Phone Number"
                required=""
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="http://localhost:3000/pmlogin"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>
          </form>
          {message && <p>{message}</p>}
        </div>
      </section>
    </div>
  );
};

export default PMSignup;

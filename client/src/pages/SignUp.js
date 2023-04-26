import React from "react";
import logoFigure from "../img/loginFigure.png";
import logo2 from "../img/logo2.png";
const SignUp = () => {
  return (
    <div className="h-screen w-full flex bg-orange-50">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto  shadow-lg bg-orange-50 sm:max-w-[1000px] h-[570px] rounded-lg">
        <form className="  max-w-[350px] h-[500px] w-full rounded-lg mx-auto bg-orange-50 rounded  p-7">
          <div className="w-14 mb-0">
            <img className="rounded-lg " src={logo2} />
          </div>
          <h2 className="text-2xl font-bold text-center py-1">Sign Up</h2>
          <div className="flex flex-col py-2 mb-2">
            <label className="text-xs ">Name</label>
            <input
              name="name"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label className="text-xs ">Email</label>
            <input
              name="email"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="user@gmail.com"
            />
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label className="text-xs ">Password</label>
            <input
              name="password"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300 "
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label className="text-xs ">Address</label>
            <input
              name="address"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="flex flex-row py-2 mb-0 ">
            <div className="flex flex-col py-2 pr-4 mb-0">
              <label className="text-xs ">City</label>
              <input
                name="city"
                className="w-full text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
                type="text"
                placeholder="City"
              />
            </div>
            <div className="flex flex-col py-2 pl-4 m-0">
              <label className="text-xs ">Phone</label>
              <input
                name="phone"
                className="w-full text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
                type="text"
                placeholder="Phone"
              />
            </div>
          </div>
          <button className="text-xs border w-full bg-orange-500 hover:bg-orange-600 border-2 text-white  border border-transparent rounded-lg my-3 py-2">
            Sign Up
          </button>
        </form>
        <div className="w-full h-[550px] hidden md:block  ">
          <img className="w-full h-full " src={logoFigure} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

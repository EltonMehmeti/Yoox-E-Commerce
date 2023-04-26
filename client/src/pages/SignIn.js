import React, { useState } from "react";
import logo from '../img/loginFigure.png'
import logo1 from '../img/logo2.png'
const SignIn = () => {
  return (
  <div className='h-screen w-full flex bg-orange-50'>
    <div className=' grid grid-cols-1 md:grid-cols-2 m-auto  shadow-lg bg-orange-50 sm:max-w-[1000px] rounded-lg'>
      <div className='w-full h-[550px] hidden md:block  '>
        <img className='w-full h-full ' src={logo} />
      </div>
      <form className='  max-w-[350px] h-[500px] w-full rounded-lg mx-auto bg-orange-50 rounded  p-7'>
        <div className="w-16 ">
          <img className='rounded-lg '  src= {logo1} />
        </div>
        <h6>Welcome back!</h6>
        <h2 className='text-4xl font-bold text-center  py-5'>Sign in</h2>
        <div className='flex flex-col py-2 mb-4'>
          <label>Email</label>
          <input className='border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-50 border p-2 border relative  rounded shadow-gray-300'type="text" placeholder="user@gmail.com"/>
        </div>
        <div className='flex flex-col py-2'>
          <label>Password</label>
          <input className= 'border py-2 border relative bg-orange-50 rounded-md  border border-transparent shadow-lg shadow-gray-300 'type="password" placeholder="********"/>
        </div>
        <button className='border w-full bg-orange-500 hover:bg-orange-600 border-2 text-white  border border-transparent rounded-lg my-6 py-2' >Sign In</button>
        <div className='flex justify-between'>
          <p className='flex items-center text-xs '><input className='mr-1 w-3 h-3' type="checkbox"/> Remember Me</p>
          <p className='text-xs text-gray-400'>I don't have an account? <button className='text-orange-500 text-xs'> Sign Up</button></p>
        </div>
      </form>
    </div>
  </div>

  );
};

export default SignIn;
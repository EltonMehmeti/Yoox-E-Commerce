import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const data = [
    {
      id: 1,
      title: "Product 1",
      img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desc: "fjunisssssssssssssssssssssssssssssssssssss",
    },
    {
      id: 2,
      title: "Product 1",
      img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desc: "fjunisssssssssssssssssssssssssssssssssssss",
    },
    {
      id: 3,
      title: "Product 1",
      img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desc: "fjunisssssssssssssssssssssssssssssssssssss",
    },
    {
      id: 4,
      title: "Product 1",
      img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desc: "fjunisssssssssssssssssssssssssssssssssssss",
    },
  ];
  const [showCart, setShowCart] = useState(false);

  const handleClick = () => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        setShowCart(!showCart);
      } else {
        Swal.fire({
          position: "top",
          icon: "Error",
          title: "You need to Login first!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/signin");
      }
    });
  };

  return (
    <div className="">
      <Toaster />
      <div className="absolute top-4 right-20" onClick={handleClick}>
        <SlBasket size={"25px"} />
      </div>
      {showCart && (
        <div
          className="absolute overflow-y-scroll border-none overflow-x-hidden rounded-2xl right-4 backdrop-filter backdrop-blur-md border-2 bg-white bg-opacity-5 w-[380px] h-[300px] p-3  mt-20"
          style={{ scrollbarWidth: "none" }}
        >
          {data.map((element) => (
            <a
              key={element.id}
              href="#"
              class="flex flex-col items-center mt-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class=" object-cover w-full rounded-t-lg h-full md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
                src={element.img}
                alt=""
              />
              <div class="flex flex-col justify-between p-4 leading-normal overflow-hidden">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {element.title}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
                  {element.desc}
                </p>
                <button
                  onClick={() => {
                    data.pop();
                    console.log(data);
                  }}
                  type="button"
                  class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </a>
          ))}

          {data.length <= 0 && <p>Your cart is empty!</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
<<<<<<< Updated upstream
import { SlBasket } from "react-icons/sl";
=======
import { CgShoppingBag } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
>>>>>>> Stashed changes
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
<<<<<<< Updated upstream
=======
  const checkout = async () => {
    console.log(checkoutItems);
    await fetch("http://localhost:3001/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: checkoutItems }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };
>>>>>>> Stashed changes
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
    console.log(filteredItems2);

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
    console.log(cart.items);
    console.log(checkoutItems);
  };

<<<<<<< Updated upstream
=======
  // Assuming the array is named 'items' and the cart items are in 'cart.items'

  // Extract the cart item IDs into a separate array
  const cartItemIds = cart.items.map((item) => item.id);

  const { productsTable, isLoading } = ProductsData();

  // Filter the 'items' array based on the cart item IDs
  const filteredItems = productsTable.filter((item) =>
    cartItemIds.includes(item.Id)
  );
  const filteredItems2 = productsTable
    .filter((item) => cartItemIds.includes(item.Id))
    .map((item) => {
      const cartItem = cart.items.find(
        (cartItem) => cartItem.productId === item.Id
      );
      const quantity = cartItem ? cartItem.quantity : 0;
      return {
        ...item,
        quantity: quantity,
      };
    });

  const checkoutItems = filteredItems.map((item) => {
    const quantity = cart.getProductQuantity(item.Id);
    const productInfo = productsTable.find((product) => product.Id === item.Id);
    return { id: item.Id, quantity: quantity, ...productInfo };
  });
  // const totalCost = cart.getTotalCost(cart.items);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
          {data.length <= 0 && <p>Your cart is empty!</p>}
=======
          {filteredItems <= 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <div>
              <h1 className="text-blue-600">
                {/* Total : {cart.getTotalCost().toFixed(2)} */}
              </h1>
              <button
                onClick={checkout}
                type="button"
                class="text-white mt-2 gap-1 bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
              >
                <IoBagCheckOutline />
                Checkout
              </button>
            </div>
          )}
>>>>>>> Stashed changes
        </div>
      )}
    </div>
  );
};

export default Cart;

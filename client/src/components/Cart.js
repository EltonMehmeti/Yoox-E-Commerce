import React, { useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { CartContext } from "../pages/CartContext";
import { useContext } from "react";
import CartProduct from "./CartProduct";
import { ProductsData, getProductData } from "./ProductsData";
const Cart = () => {
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
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

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
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

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
  return (
    <div className="">
      <Toaster />
      <div className="absolute top-4 right-20" onClick={handleClick}>
        <CgShoppingBag size={"25px"} />
        <p className="text-white text-xs">{cart.items.length}</p>
      </div>
      {showCart && (
        <div
          className="absolute overflow-y-scroll border-none overflow-x-hidden rounded-2xl right-4 backdrop-filter backdrop-blur-md border-2 bg-white bg-opacity-5 w-[380px] h-[300px] p-3  mt-20"
          style={{ scrollbarWidth: "none" }}
        >
          {cart.items.map((element, idx) => (
            <CartProduct
              key={idx}
              id={element.id}
              quantity={element.quantity}
            />
          ))}

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
        </div>
      )}
    </div>
  );
};

export default Cart;

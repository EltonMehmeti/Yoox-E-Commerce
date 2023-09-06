import React, { useEffect, useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { CartContext } from "../pages/client/CartContext";
import { useContext } from "react";
import CartProduct from "./CartProduct";
import { ProductsData } from "./ProductsData";
import { useModal } from "react-hooks-use-modal";
import { AiFillHome } from "react-icons/ai";

const getTotalCost = (cartProducts, productsTable) => {
  let totalCost = 0;
  if (cartProducts && Array.isArray(cartProducts)) {
    cartProducts.forEach((cartItem) => {
      const productData = productsTable.find(
        (product) => product.Id === cartItem.id
      );

      if (productData) {
        totalCost += productData.Price * cartItem.quantity;
      }
    });
  }

  return totalCost;
};

const Cart = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    console.log(checkoutItems);

    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        // Set the customer's email
        setCustomerEmail(response.data.user[0].Email);
        setAddress(response.data.user[0].Address);
        setUserId(response.data.user[0].Id);
        // Call the checkout function with the customer's email
      }
    });
  }, []);

  const checkout = async () => {
    console.log(checkoutItems);
    const loginStatusResponse = await axios.get(
      "http://localhost:3001/api/loginStatus"
    );

    if (loginStatusResponse.data.loggedIn === true) {
      setShowCart(!showCart);
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "You need to log in first!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/signin");
      return;
    }

    const checkoutResponse = await fetch("http://localhost:3001/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: checkoutItems,
        customerEmail: customerEmail,
        address: address,
        userId: userId,
        couponCode: couponCode, // Include the coupon code in the request body
      }),
    });

    const responseJson = await checkoutResponse.json();
    if (responseJson.url) {
      window.location.assign(responseJson.url);
    }
  };
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [showCart, setShowCart] = useState(false);
  const handleClick = () => {
    open();

    console.log(cart.items);
    console.log(checkoutItems);
  };

  const cart = useContext(CartContext);

  const cartItemIds = cart.items.map((item) => item.id);
  const { productsTable, isLoading } = ProductsData();

  const filteredItems = productsTable.filter((item) =>
    cartItemIds.includes(item.Id)
  );

  const checkoutItems = filteredItems.map((item) => {
    const quantity = cart.getProductQuantity(item.Id);
    const productInfo = productsTable.find((product) => product.Id === item.Id);
    return { id: item.Id, quantity: quantity, ...productInfo };
  });

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: false,
    closeOnOverlayClick: false,
  });
  return (
    <div className="">
      <Toaster />
      <div className="absolute top-4 right-20" onClick={handleClick}>
        <CgShoppingBag size={"25px"} />
      </div>
      <Modal>
        <button onClick={close}>close</button>
        <div className=" border-none overflow-x-hidden rounded-2xl backdrop-filter backdrop-blur-md border-2 bg-white bg-opacity-5 h-auto w-[800px]  p-3  ">
          <div className="flex flex-row gap-10 h-screen p-4">
            <div className="h-[2/5] p-6 m-2 rounded-lg bg-white w-[60%]">
              <h1 className="font-bold p-4">Cart</h1>

              <hr></hr>

              <div className="overflow-y-scroll h-3/4 ">
                {cart.items.map((element, idx) => (
                  <CartProduct
                    key={idx}
                    id={Number(element.id)}
                    quantity={element.quantity}
                  />
                ))}
              </div>

              <hr></hr>
            </div>
            <div className="h-[55%] bg-white p-8 rounded-lg w-[40%]">
              <p className="font-light text-xs  text-gray-500">
                Delivery Date: November 24,2023
              </p>
              <hr className=" border-dashed m-2   border-2"></hr>

              <div class="relative my-4">
                <input
                  type=""
                  id="search"
                  class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pomocode "
                  required
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="submit"
                  class=" text-gray-700 border  absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Apply
                </button>
              </div>
              <hr className=" border-dashed m-2   border-2"></hr>
              <div className="flex justify-between">
                <div>
                  <h4>Delivery: </h4>
                  <h4>Tax: </h4>
                </div>
                <div>
                  <h4>0.00</h4>
                  <h4>0.00</h4>
                </div>
              </div>

              <hr className=" border-dashed m-2   border-2"></hr>
              <div className="p-2">
                <h4>
                  Total: $
                  {getTotalCost(checkoutItems, productsTable).toFixed(2)}
                </h4>
              </div>
              <button
                onClick={checkout}
                type="button"
                className="text-white gap-2  bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none w-full focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
              >
                <IoBagCheckOutline />
                Checkout
              </button>
              <button
                onClick={close}
                type="button"
                className="text-gray-900 gap-2 w-full bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
              >
                <AiFillHome />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

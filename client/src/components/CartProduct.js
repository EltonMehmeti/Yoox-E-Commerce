import React from "react";
import { CartContext } from "../pages/CartContext";
import { useContext } from "react";
import { getProductData } from "./ProductsData";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
const CartProduct = (props) => {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;

  const productData = getProductData(id);

  if (!productData) {
    // Product data is still loading or not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <a
        key={productData.Id}
        href=""
        className="flex flex-col items-center mt-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
          src="https://storage.googleapis.com/alpine-inkwell-325917.appspot.com/devices/macbook-pro-m1-14-header.png"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal overflow-hidden">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {productData.Name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
            {productData.Description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
            {productData.Price}$
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
            {quantity}
          </p>
          <button
            onClick={() => {
              cart.deleteFromCart(id);
            }}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </a> */}
      <div className="flex items-center mt-6 mb-6">
        <div>
          <img
            src="https://storage.googleapis.com/alpine-inkwell-325917.appspot.com/devices/macbook-pro-m1-14-header.png"
            className="w-36 h-36 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 ml-4">
          <div>
            <h1 className="font-light text-gray-500 truncate">
              {productData.Name}
            </h1>
            <p className="font-light text-gray-500">
              ${productData.Price}|{" "}
              <span className="font-bold text-green-500">In Stock</span>
            </p>
            <h3 className="font-light text-gray-500">{quantity}</h3>
          </div>
          <div>
            <p className="font-light text-gray-500">
              Total: {(quantity * productData.Price).toFixed(2)}
            </p>

            <button
              onClick={() => {
                cart.addOneToCart(id);
              }}
              className="font-light flex flex-row items-center justify-center ml-32 text-gray-600"
            >
              +
            </button>
            <button
              onClick={() => {
                cart.deleteFromCart(id);
              }}
              className="font-light flex flex-row items-center justify-center ml-28 text-gray-600"
            >
              <AiFillDelete /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

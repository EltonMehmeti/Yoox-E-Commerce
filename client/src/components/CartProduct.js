import React from "react";
import { CartContext } from "../pages/client/CartContext";
import { useContext } from "react";
import { getProductData } from "./ProductsData";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
const CartProduct = (props) => {
  const cart = useContext(CartContext);
  const id = props.id;
  console.log(id);
  const quantity = props.quantity;
  const productData = getProductData(id);
  console.log(productData);
  if (!productData) {
    // Product data is still loading or not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center mt-6 mb-6">
        <div>
          <img
            src={`http://localhost:3001${productData.Img1}`}
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
            <h3 className="font-light text-gray-500">Qty: {quantity}</h3>
          </div>
          <div>
            <p className="font-light text-gray-500">
              Total: ${(quantity * productData.Price).toFixed(2)}
            </p>

            {/* <hr></hr> */}
            <div className="flex flex-row w-[8rem]">
              <button
                onClick={() => {
                  cart.addOneToCart(id);
                }}
                className="font-light flex items-center justify-center text-gray-600 flex-grow-0"
                style={{ flexBasis: "50%", maxWidth: "50%" }}
              >
                <AiOutlinePlusCircle />
              </button>
              <button
                onClick={() => {
                  cart.deleteFromCart(id);
                }}
                className="font-light flex items-center justify-center text-gray-600 flex-grow-0"
                style={{ flexBasis: "50%", maxWidth: "50%" }}
              >
                <AiFillDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

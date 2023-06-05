import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useModal } from "react-hooks-use-modal";
import Delivery from "../components/admin/Delivery";
import CanvasJSReact from "@canvasjs/react-charts";
import { AiOutlineClose } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { BsSortNumericDown } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsBoxFill } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import axios from "axios";
const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        // Set the customer's email
        setUserEmail(response.data.user[0].Email);
        console.log(response.data.user[0].Email);
        // Call the track orders endpoint with the customer's email
        axios
          .post("http://localhost:3001/api/orders/track", {
            customerEmail: response.data.user[0].Email,
          })
          .then((response) => {
            setOrders(response.data);
            console.log(orders);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Handle the case where there is no user email
        console.log("No user email available");
        // Display a message or take appropriate action
      }
    });
  }, []);

  const deliveredOrders = orders.filter(
    (order) => order.shipping_status == "Delivered"
  );
  const pendingOrders = orders.filter(
    (order) => order.shipping_status == "Pending"
  );
  const packingOrders = orders.filter(
    (order) => order.shipping_status == "Packing"
  );
  console.log(deliveredOrders.length);
  const [orderId, setOrderId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [itemNames, setItemNames] = useState([]);
  const [itemQuantity, setItemQuantity] = useState([]);
  const [itemPrices, setItemPrices] = useState([]);
  const [Img, setImg] = useState([]);

  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");

  const handleOrder = async (id) => {
    axios.get(`http://localhost:3001/api/orders/${id}`).then((response) => {
      const data = response.data;
      if (data) {
        setOrderId(data.order_id);
        setCustomerEmail(data.customer_email);
        setAddress(data.address);
        setOrderDate(data.order_date);
        setImg(data.item_images);
        setItemNames(data.item_names);
        setItemQuantity(data.item_quantity);
        setItemPrices(data.item_prices);
        setTotalPrice(data.total_price);
        setShippingStatus(data.shipping_status);
      }
    });
  };
  console.log(Img);
  const options = {
    theme: "",
    animationEnabled: true,
    exportFileName: "New Year Resolutions",
    exportEnabled: true,
    title: {
      text: "Orders Shipping Status",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        // indexLabelPlacement: "inside",
        dataPoints: [
          { y: packingOrders.length, label: "Packing" },
          { y: pendingOrders.length, label: "Pending" },
          { y: deliveredOrders.length, label: "Delivered" },
        ],
      },
    ],
  };
  const sort = () => {
    const sortedByPrice = [...orders].sort(
      (a, b) => b.total_price - a.total_price
    );
    setOrders(sortedByPrice);
  };
  const [search, setSearch] = useState("");
  const calculateTotalEarnings = () => {
    return orders?.reduce((total, order) => total + order.total_price, 0);
  };

  return (
    <div>
      <Header />
      <div className="h-auto flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl p-2">Tracking dashboard</h1>
        <div className="flex flex-row gap-24 mt-6">
          <h1 className="font-semibold text-gray-500">
            Pending({pendingOrders.length})
          </h1>
          <h1 className="font-semibold text-gray-500">
            Packing({packingOrders.length})
          </h1>
          <h1 className="font-semibold text-gray-500">
            Delivered({deliveredOrders.length})
          </h1>
        </div>
        <div class="flex flex-wrap flex-row p-10 items-center justify-center mt-20overflow-y-scroll gap-6 w-3/4">
          {orders
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.customer_email.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((order, i) => {
              return (
                <div
                  key={i}
                  className="h-72 w-72 pt-4 px-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col"
                >
                  {/* Content */}
                  <div className="mb-auto">
                    <h1 className="font-bold text-lg">
                      Order ID: {order.order_id}
                    </h1>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {order.item_name}
                    </h5>

                    <p className="mb-2 font-bold text-gray-700 dark:text-gray-400 text-sm">
                      {order.item_names.join(" | ")}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-sm">
                      {new Date(order.order_date).toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      {new Date(order.order_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-sm">
                      ${order.total_price}
                    </p>
                    <button
                      onClick={() => {
                        open();
                        handleOrder(order.order_id);
                      }}
                      className="inline-flex mt-10 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Track
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* Label */}
                  <div
                    className={`w-full  rounded-tr-xl rounded-tl-xl h-2 ${
                      order.shipping_status.toLowerCase() == "delivered"
                        ? "bg-green-500"
                        : "bg-[#fea41f]"
                    }`}
                  ></div>
                </div>

                // <tr
                //   class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                //   key={order.order_id}
                // >
                //   <td class="px-2 py-2">
                //     <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                //       {order.customer_email}
                //     </span>
                //   </td>
                //   <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     <div className="flex items-center">
                //       {new Date(order.order_date).toLocaleDateString([], {
                //         year: "numeric",
                //         month: "long",
                //         day: "numeric",
                //       })}{" "}
                //       {new Date(order.order_date).toLocaleTimeString([], {
                //         hour: "2-digit",
                //         minute: "2-digit",
                //       })}
                //     </div>
                //   </td>
                //   <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     {order.item_names.join("| ")}
                //   </td>
                //   <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     {order.item_quantity.join(", ")}
                //   </td>
                //   <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     {order.total_quantity}
                //   </td>
                //   <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     ${order.total_price}
                //   </td>
                //   <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //     {order.shipping_status === "Delivered" ? (
                //       <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                //         <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                //         Delivered
                //       </span>
                //     ) : order.shipping_status === "Packing" ? (
                //       <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                //         <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                //         Packing
                //       </span>
                //     ) : (
                //       <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                //         <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                //         Pending
                //       </span>
                //     )}
                //   </td>

                //   <td>
                //     <button
                //       onClick={() => {
                //         open();
                //         handleOrder(order.order_id);
                //       }}
                //     >
                //       <IoMdMore />
                //     </button>
                //   </td>
                // </tr>
              );
            })}
        </div>
      </div>

      <Modal>
        <div className="bg-white w-[600px] p-14 rounded-xl">
          <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
            <div className="flex flex-col w-full gap-y-4">
              <div>
                <h1 className="  font-bold">Order ID: {orderId}</h1>
                <a href={`mailto:${customerEmail}`}>
                  <h1>Customer Email: {customerEmail}</h1>
                  <AiTwotoneMail />
                </a>
                <div className="flex items-center">
                  {new Date(orderDate).toLocaleDateString([], {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {new Date(orderDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <hr className="text-gray-500" />
              <div className=" overflow-y-scroll">
                {Img?.map((img, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <img
                      src={`http://localhost:3001${img}`}
                      alt={`Product ${index + 1}`}
                      className="w-20 h-20 mr-4 border rounded-lg p-1 bg-gray-100"
                    />
                    <div>
                      <h1>{itemNames[index]}</h1>
                      <p>Quantity: {itemQuantity[index]}</p>
                      <p className=" font-semibold">
                        Price: ${itemPrices[index]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h1>
                Address: <h1 className="font-semibold">{address}</h1>
              </h1>
              <hr className="text-gray-500 " />
              <h1 className=" font-semibold">Total Price: ${totalPrice}</h1>
              <h1>Order Status: </h1>
              <div className="flex items-center  justify-center">
                <Delivery status={shippingStatus} />
              </div>
            </div>
            <button onClick={close}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrackOrders;

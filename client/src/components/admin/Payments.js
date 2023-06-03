import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import Sidebar from "./Sidebar";
import { useModal } from "react-hooks-use-modal";
import Delivery from "./Delivery";
import CanvasJSReact from "@canvasjs/react-charts";
import { AiOutlineClose } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { BsSortNumericDown } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import Widgets from "./Widgets";

const Payments = () => {
  const [orders, setOrders] = useState([]);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
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

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
    <div className="flex items-center bg-[#fafbfb]  h-screen">
      <Sidebar />

      <div className="ml-20 h-screen flex items-center justify-center flex-col">
        <div className=" self-baseline justify-self-end w-full justify-center items-center flex-row flex mb-20   h-100 p-4">
          <div className="w-1/3">
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center ">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="p-4 rounded-full bg-[#ebfaf2] border">
                    <MdOutlineAccountBalanceWallet fill="#5fd8b9" size={40} />
                  </span>
                  <div className="ml-4">
                    <p className="font-bold text-gray-400">Earnings</p>
                    <p className="text-2xl mt-2">${calculateTotalEarnings()}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                >
                  <BsCurrencyDollar />
                </button>
              </div>
              <div className="mt-6">
                <button color="white" text="Download" borderRadius="10px" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-around items-center">
          <button
            class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
            onClick={() => {
              sort();
            }}
          >
            <BsSortNumericDown />
          </button>

          <input
            type="search"
            onChange={(e) => {
              console.log(e.target.value);
              setSearch(e.target.value);
            }}
            id="default-search"
            class=" w-1/5  h-[40px] mb-2  p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Email"
            required
          />
        </div>
        <table class="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">
                Costumer
              </th>
              <th scope="col" class="px-4 py-3">
                Order At
              </th>
              <th scope="col" class="px-4 py-3">
                Product Names
              </th>
              <th scope="col" class="px-4 py-3">
                Product Quantity
              </th>
              <th scope="col" class="px-4 py-3">
                Total Quantity
              </th>
              <th scope="col" class="px-4 py-3">
                Total Price{" "}
              </th>
              <th scope="col" class="px-4 py-3">
                Shipping Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.customer_email
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((order, i) => {
                return (
                  <tr
                    class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    key={order.order_id}
                    // <Link to={`order/${order.order_id}`}>
                  >
                    <td class="px-4 py-2">
                      <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {order.customer_email}
                      </span>
                    </td>
                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {new Date(order.order_date).toLocaleDateString([], {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        {new Date(order.order_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.item_names.join("| ")}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.item_quantity.join(", ")}
                    </td>
                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.total_quantity}
                    </td>
                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      ${order.total_price}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {order.shipping_status === "Delivered" ? (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                          Delivered
                        </span>
                      ) : order.shipping_status === "Packing" ? (
                        <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                          <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                          Packing
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          open();
                          handleOrder(order.order_id);
                        }}
                      >
                        <IoMdMore />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
                      src="https://storage.googleapis.com/alpine-inkwell-325917.appspot.com/devices/macbook-pro-m1-14-header.png"
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

export default Payments;

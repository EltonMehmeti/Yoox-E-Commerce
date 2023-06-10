import axios from "axios";
import React, { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";

const ShippingPostman = () => {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState({});
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/orders")
      .then((response) => {
        setOrders(
          response.data.filter((data) => data.shipping_status === "Pending")
        );
        setDeliveredOrders(
          response.data.filter((data) => data.shipping_status === "Delivered")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateShippingStatus = (orderId, shippingStatus) => {
    axios
      .put(`http://localhost:3001/api/orders/${orderId}`, { shippingStatus })
      .then((response) => {
        console.log("Shipping status updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update shipping status", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="overflow-x-auto flex flex-col gap-20 justify-center ml-10">
        <table className="w-1/3 text-xs text-left text-gray-500 overflow-y-scroll dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-2">
                Customer
              </th>
              <th scope="col" className="px-2 py-2">
                Order At
              </th>
              <th scope="col" className="px-2 py-2">
                Product Names
              </th>
              <th scope="col" className="px-2 py-2">
                Product Quantity
              </th>
              <th scope="col" className="px-2 py-2">
                Total Quantity
              </th>
              <th scope="col" className="px-2 py-2">
                Total Price
              </th>
              <th scope="col" className="px-2 py-2">
                Shipping Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => {
              return (
                <tr
                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={order.order_id}
                >
                  <td className="px-2 py-1">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      {order.customer_email}
                    </span>
                  </td>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.item_names.join("| ")}
                  </td>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.item_quantity.join(", ")}
                  </td>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.total_quantity}
                  </td>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    $ {order.total_price}
                  </td>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <select
                      value={
                        selectedStatus[order.order_id] || order.shipping_status
                      }
                      onChange={(e) => {
                        setSelectedStatus({
                          ...selectedStatus,
                          [order.order_id]: e.target.value,
                        });
                        updateShippingStatus(order.order_id, e.target.value);
                      }}
                      className="bg-gray-50 border w-auto border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Packing">Packing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="p-2 border rounded-lg  justify-end w-[35%] ">
          <h1>Delivered Orders</h1>
          <table className="w-1/4 text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">
                  Customer
                </th>
                <th scope="col" className="px-2 py-2">
                  Order At
                </th>
                <th scope="col" className="px-2 py-2">
                  Shipping Status
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveredOrders?.map((order, i) => {
                return (
                  <tr
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    key={order.order_id}
                  >
                    <td className="px-2 py-1">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {order.customer_email}
                      </span>
                    </td>
                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                    <td className="px-2 py-1">
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-1 px-1.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-1.5 h-1.5 mr-0.5 bg-green-500 rounded-full"></span>
                        {order.shipping_status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingPostman;

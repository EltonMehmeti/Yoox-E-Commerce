import axios from "axios";
import React, { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";
// import { useModal } from "react-hooks-use-modal";
import MapComponent from "../../MapComponent";

const ShippingPostman = () => {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [postmanId, setPostmanId] = useState(null); // Moved postmanId to the top-level
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [postmanStatus, setPostmanStatus] = useState("");
  const navigate = useNavigate();

  // Fetch all orders when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/postmanAuth/loginStatus")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setPostmanId(response.data.user.Id); // Set the postmanId once
          setFirstName(response.data.user.Name); // Set the postmanId once
          setLastName(response.data.user.LastName); // Set the postmanId once
          setPhoneNumber(response.data.user.phonenumber); // Set the postmanId once
          setStatus(response.data.user.status); // Set the postmanId once
        } else {
          // Handle the case where there is no user email
          console.log("No user email available!");
          // Display a message or take appropriate action
          navigate("/pmlogin");
        }
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch orders whenever postmanId changes
  useEffect(() => {
    if (postmanId !== null) {
      axios
        .post("http://localhost:3001/api/postman/orders", {
          postmanId: postmanId,
        })
        .then((response) => {
          setOrders(
            response.data.filter((data) => data.shipping_status != "Delivered")
          );
          console.log(orders);
          setDeliveredOrders(
            response.data.filter((data) => data.shipping_status === "Delivered")
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [postmanId]); // Fetch whenever postmanId changes
  const updateShippingStatus = (orderId, shippingStatus) => {
    axios
      .put(`http://localhost:3001/api/orders/${orderId}`, { shippingStatus })
      .then((response) => {
        alert("Shipping status updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update shipping status", error);
      });
  };
  const updatePostmanStatus = () => {
    console.log(postmanStatus);
    axios
      .put(`http://localhost:3001/api/postman/updateStatus`, {
        postmanId: postmanId,
        status: postmanStatus,
      })
      .then((response) => {
        alert("Postman status updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update postman status", error);
      });
  };
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  let [placeName, setPlaceName] = useState("");
  return (
    <div className="flex items-center  h-screen">
      <div className="border-1 flex flex-col items-center justify-center p-10 m-2 w-1/5 backdrop-filter backdrop-blur-md border-2   bg-opacity-5 h-full rounded-lg ">
        <div className="p-4 flex flex-row flex-wrap w-full   gap-6">
          <h1 className="font-bold text-xl ">Postman logged in:</h1>
          <div>
            <h1 className="font-semibold text-gray-600">FirstName: </h1>
            <h1 className="font-bold text-gray-800 mb-8 text-lg">
              {firstname}
            </h1>
            <h1 className="font-semibold text-gray-600">LastName: </h1>
            <h1 className="font-bold text-gray-800 text-lg">{lastname}</h1>
          </div>
          <div>
            <h1 className="font-semibold text-gray-600">Phone Number: </h1>
            <h1 className="font-bold text-gray-800 mb-8 text-lg">
              {phonenumber}
            </h1>

            <h1 className="font-semibold text-gray-600">Status: </h1>
            <h1
              className={`font-bold ${
                status == "available" ? "text-green-500" : "text-red-500"
              } text-lg `}
            >
              {status}
            </h1>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="position"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Set Status
            </label>
            <select
              onChange={(e) => {
                setPostmanStatus(e.target.value.split("-")[0]);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Null</option>
              <option>Available</option>
              <option>Not Available</option>
            </select>
            <button
              className="text-white bg-gradient-to-r mt-4 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => updatePostmanStatus()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto flex flex-col gap-20 justify-center ml-10">
        <h1 className=" text-gray-700  font-bold">Incoming Orders</h1>
        <table className="w-1/3 text-xs text-left text-gray-500 overflow-y-scroll dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-2">
                Customer
              </th>
              <th>Address</th>
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
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      {order.address}
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
                  <td>
                    <span
                      onClick={() => {
                        open();
                        setPlaceName((placeName = order.address));
                      }}
                      className=" cursor-pointer m-2 ml-4"
                    >
                      <FaMapMarkedAlt size={18} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal>
          <div className="bg-white p-14  w-[80vh] rounded-xl">
            <button onClick={close}>X</button>

            <MapComponent placeName={placeName} />
          </div>
        </Modal>
        <div className="p-2 border rounded-lg  justify-end w-auto ">
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { useModal } from "react-hooks-use-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [usersTable, setUsersTable] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (!response.data.loggedIn) {
        navigate("/signin");
      } else if (response.data.user[0].User_Type !== "Admin") {
        navigate("/");
      }
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/users")
      .then((response) => {
        setUsersTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // delete user function
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      setUsersTable(usersTable.filter((val) => val.id !== id));
      window.location.reload();
    });
  };

  //
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setuserType] = useState("");

  //
  const insertUser = () => {
    axios
      .post(`http://localhost:3001/api/insert`, {
        name: name,
        email: email,
        password: password,
        address: address,
        city: city,
        phone: phone,
        userType: userType,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      });
  };

  // update user function
  const [nameUpdated, setNameUpdated] = useState("");
  const [emailUpdated, setEmailUpdated] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState("");
  const [addressUpdated, setAddressUpdated] = useState("");
  const [cityUpdated, setCityUpdated] = useState("");
  const [phoneUpdated, setPhoneUpdated] = useState("");
  const [usertTypeUpdated, setUsertTypeUpdated] = useState("");
  const Swal = require("sweetalert2");
  const updateUser = (id) => {
    axios
      .put(`http://localhost:3001/api/update/${id}`, {
        nameU: nameUpdated,
        emailU: emailUpdated,
        passwordU: passwordUpdated,
        addressU: addressUpdated,
        cityU: cityUpdated,
        phoneU: phoneUpdated,
        usertypeU: usertTypeUpdated,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Succesfully Update!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      });
  };
  let [userId, setUserId] = useState(null);
  // update modal
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            open2();
          }}
        >
          Create User
        </button>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <Modal2>
            <div className="bg-white p-14 rounded-xl">
              <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 class="text-xl font-semibold dark:text-white">Add New</h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  data-modal-toggle="add-user-modal"
                  onClick={close2}
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="p-6 space-y-6">
                <form action="#">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Name"
                        required=""
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="last-name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Email"
                        required=""
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Password"
                        required=""
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Address"
                        required=""
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="biography"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="City"
                        required=""
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Phone"
                        required=""
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Type
                      </label>
                      <input
                        type="text"
                        name="userType"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Address"
                        required=""
                        onChange={(e) => {
                          setuserType(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => {
                    insertUser();
                  }}
                >
                  Create User
                </button>
              </div>
            </div>
          </Modal2>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                User Type
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersTable.map((user, i) => {
              return (
                <tr
                  key={user.Id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.Name}
                  </th>
                  <td className="px-6 py-4">{user.Email}</td>
                  <td className="px-6 py-4">{user.Password}</td>
                  <td className="px-6 py-4">{user.Address}</td>
                  <td className="px-6 py-4">{user.City}</td>
                  <td className="px-6 py-4">{user.Phone}</td>
                  <td className="px-6 py-4">{user.User_Type}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        console.log(user.Id);
                        deleteUser(user.Id);
                      }}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                    >
                      <BsFillTrash3Fill />
                    </button>
                    <button
                      className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                      onClick={() => {
                        setUserId((userId = user.Id));
                        // console.log(userId);
                        open();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                      <Modal>
                        <div className=" bg-white p-14 rounded-xl">
                          <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                            data-modal-toggle="add-user-modal"
                            onClick={close}
                          >
                            <svg
                              class="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Update User with Id: {userId}
                              </h2>
                              <form action="">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                  <div className="sm:col-span-2">
                                    <label
                                      for="name"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Name{" "}
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setNameUpdated(e.target.value);
                                      }}
                                      type="text"
                                      name="nameU"
                                      id="name"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Type user name"
                                      required=""
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label
                                      for="emailU"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Email
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setEmailUpdated(e.target.value);
                                      }}
                                      type="Email"
                                      name="emailU"
                                      id="brand"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Email"
                                      required=""
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label
                                      for="passwordU"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Password
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setPasswordUpdated(e.target.value);
                                      }}
                                      type="text"
                                      name="passwordU"
                                      id="price"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Password"
                                      required=""
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label
                                      for="addressU"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Address
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setAddressUpdated(e.target.value);
                                      }}
                                      type="text"
                                      name="addressU"
                                      id="price"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Password"
                                      required=""
                                    />
                                  </div>
                                  <div>
                                    <label
                                      for="category"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      User Type
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setUsertTypeUpdated(e.target.value);
                                      }}
                                      name="usertypeU"
                                      placeholder="User Type"
                                      id="category"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      for="item-weight"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Phone
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setPhoneUpdated(e.target.value);
                                      }}
                                      type="number"
                                      name="phoneU"
                                      id="item-weight"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Phone"
                                      required=""
                                    />
                                  </div>
                                  <div className="">
                                    <label
                                      for="description"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      City
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setCityUpdated(e.target.value);
                                      }}
                                      type="text"
                                      name="cityU"
                                      id="item-weight"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="City"
                                      required=""
                                    />
                                  </div>
                                </div>
                                <br></br>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(userId);
                                    updateUser(userId);
                                  }}
                                  type="submit"
                                  className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                                >
                                  <AiOutlineEdit />
                                </button>
                              </form>
                            </div>
                          </section>
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

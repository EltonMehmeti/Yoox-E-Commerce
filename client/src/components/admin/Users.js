import React, { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BsSortAlphaDown } from "react-icons/bs";
import Sidebar from "./Sidebar";
const Users = () => {
  const [usersTable, setUsersTable] = useState([]);
  const [countries, setCountries] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getusers")
      .then((response) => {
        setUsersTable(response.data);
        console.log(usersTable);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/country/getcountries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // delete user function
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/api/users/delete/${id}`)
      .then((response) => {
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
  const [country, setCountry] = useState(null);

  //
  const insertUser = () => {
    axios
      .post(`http://localhost:3001/api/users/insert`, {
        name: name,
        email: email,
        password: password,
        address: address,
        city: city,
        phone: phone,
        countryId: country,
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
  let [nameUpdated, setNameUpdated] = useState("");
  let [emailUpdated, setEmailUpdated] = useState("");
  let [passwordUpdated, setPasswordUpdated] = useState("");
  let [addressUpdated, setAddressUpdated] = useState("");
  let [cityUpdated, setCityUpdated] = useState("");
  let [phoneUpdated, setPhoneUpdated] = useState("");
  let [countryU, setCountryU] = useState("");
  let Swal = require("sweetalert2");
  let updateUser = (id) => {
    axios
      .put(`http://localhost:3001/api/users/update/${id}`, {
        nameU: nameUpdated,
        emailU: emailUpdated,
        passwordU: passwordUpdated,
        addressU: addressUpdated,
        cityU: cityUpdated,
        phoneU: phoneUpdated,
        countryIdU: countryU,
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
  const [Modal3, open3, close3, isOpen3] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const sort = () => {
    const sortedUsersTable = [...usersTable].sort((a, b) => {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setUsersTable(sortedUsersTable);
  };
  const [search, setSearch] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryImg, setCountryImg] = useState("");
  const insertCountry = () => {
    const formData = new FormData();
    formData.append("name", countryName);
    formData.append("image", countryImg);

    axios
      .post("http://localhost:3001/country/insert", formData)
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Country Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error inserting country:", error);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to insert country.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="flex ">
      <Sidebar />

      {/*  */}

      <div className="relative overflow-x-auto mt-10 ml-20 w-[65%]  p-4 shadow-md sm:rounded-lg">
        <div className="flex flex-row  items-center justify-around">
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              open2();
            }}
          >
            Create User
          </button>
          <button
            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
            onClick={() => {
              sort();
            }}
          >
            <BsSortAlphaDown />
          </button>

          <input
            type="search"
            onChange={(e) => {
              console.log(e.target.value);
              setSearch(e.target.value);
            }}
            id="default-search"
            className=" w-1/5  h-[40px] mb-2  p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Name"
            required
          />
        </div>

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 overflow-y-auto">
          <Modal2>
            <div className="bg-white p-14 rounded-xl">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold dark:text-white">
                  Add New
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  data-modal-toggle="add-user-modal"
                  onClick={close2}
                >
                  <svg
                    className="w-5 h-5"
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

              <div className="p-6 space-y-6">
                <form action="#">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Name"
                        required=""
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="last-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Email"
                        required=""
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Password"
                        required=""
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Address"
                        required=""
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="biography"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="City"
                        required=""
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Phone"
                        required=""
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country
                      </label>
                      <select
                        onChange={(e) => {
                          setCountry(e.target.value.split("-")[0]);
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <opiton>Null</opiton>;
                        {countries?.map((country) => {
                          return (
                            <option>
                              {country.Id}-{country.Name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
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
        <table className=" text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>

              <th scope="col" className="px-6 py-3">
                Country
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
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersTable
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.Name.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((user, i) => {
                return (
                  <tr
                    key={user.Id}
                    className="bg-white border-b h-[70px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py- h-[70px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.Name}
                    </th>
                    <td className="px-6 h-[70px] py-2">{user.Email}</td>

                    <td className="px-4 py-2">
                      <img
                        src={`http://localhost:3001${user.countryImg}`}
                        alt={user.countryImg}
                        className="w-4 rounded-full h-4 mr-3"
                      />
                      {user.countryName}
                    </td>
                    <td className="px-6 h-[70px] py-2">{user.Address}</td>
                    <td className="px-6 h-[70px] py-2">{user.City}</td>
                    <td className="px-6 h-[70px] py-2">{user.Phone}</td>

                    <td className="px-6 h-[70px] py-2 text-right">
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
                          setNameUpdated((nameUpdated = user.Name));
                          setEmailUpdated((emailUpdated = user.Email));
                          setPasswordUpdated((passwordUpdated = user.Password));
                          setAddressUpdated((addressUpdated = user.Address));
                          setCityUpdated((cityUpdated = user.City));
                          setPhoneUpdated((phoneUpdated = user.Phone));

                          setCityUpdated((cityUpdated = user.City));
                          // console.log(userId);
                          open();
                        }}
                      >
                        <AiOutlineEdit />
                      </button>
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <Modal>
                          <div className=" bg-white p-14 rounded-xl">
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                              data-modal-toggle="add-user-modal"
                              onClick={close}
                            >
                              <svg
                                className="w-5 h-5"
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
                                        value={nameUpdated}
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
                                        value={emailUpdated}
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
                                        value={passwordUpdated}
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
                                        value={addressUpdated}
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
                                        for="item-weight"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Phone
                                      </label>
                                      <input
                                        value={phoneUpdated}
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
                                    <div>
                                      <label
                                        for="position"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Country
                                      </label>
                                      <select
                                        onChange={(e) => {
                                          setCountryU(
                                            e.target.value.split("-")[0]
                                          );
                                        }}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      >
                                        <opiton>Null</opiton>;
                                        {countries?.map((country) => {
                                          return (
                                            <option>
                                              {country.Id}-{country.Name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                    <div className="">
                                      <label
                                        for="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        City
                                      </label>
                                      <input
                                        value={cityUpdated}
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
        <div className="h-[20%] m-8">
          <button
            className="text-white m-4 mb-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
            onClick={open3}
          >
            New Country
          </button>
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 h-3/4 overflow-y-scroll">
            {countries?.map((country) => {
              return (
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`http://localhost:3001${country.Image}`}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {country.Name}
                      </p>

                      <p className=" text-xs text-gray-500 truncate dark:text-gray-400"></p>
                    </div>
                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div> */}
                  </div>
                </li>
              );
            })}
          </ul>
          <Modal3>
            <div className="bg-white p-14 rounded-xl">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold dark:text-white">
                  Add New
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  data-modal-toggle="add-user-modal"
                  onClick={close3}
                >
                  <svg
                    className="w-5 h-5"
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

              <div className="p-6 space-y-6">
                <form action="#">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Name"
                        required=""
                        onChange={(e) => {
                          setCountryName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="..."
                        placeholder="image"
                        required=""
                        onChange={(e) => {
                          setCountryImg(e.target.files[0]); // Store the selected file
                          console.log(countryImg);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => {
                    insertCountry();
                  }}
                >
                  Create Country
                </button>
              </div>
            </div>
          </Modal3>
        </div>
      </div>
    </div>
  );
};

export default Users;

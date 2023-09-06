import React, { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BsSortAlphaDown } from "react-icons/bs";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
const AdminTable = () => {
  const [adminsTable, setAdminsTable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/crud/getadmins")
      .then((response) => {
        setAdminsTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete admin function
  const deleteAdmin = (id) => {
    axios
      .delete(`http://localhost:3001/api/crud/delete/${id}`)
      .then((response) => {
        setAdminsTable(adminsTable.filter((val) => val.id !== id));
        window.location.reload();
      });
  };

  // Insert admin
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const insertAdmin = () => {
    axios
      .post(`http://localhost:3001/api/crud/insert`, {
        username: username,
        email: email,
        password: password,
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

  // Update admin function
  let [usernameUpdated, setUsernameUpdated] = useState("");
  let [emailUpdated, setEmailUpdated] = useState("");
  let [passwordUpdated, setPasswordUpdated] = useState("");

  const updateAdmin = (id) => {
    axios
      .put(`http://localhost:3001/api/crud/update/${id}`, {
        username: usernameUpdated,
        email: emailUpdated,
        password: passwordUpdated,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Successfully Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      });
  };

  let [adminId, setAdminId] = useState(null);

  // Update modal
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  // Sort function
  const sort = () => {
    const sortedAdminsTable = [...adminsTable].sort((a, b) => {
      const usernameA = a.username.toUpperCase();
      const usernameB = b.username.toUpperCase();
      if (usernameA < usernameB) {
        return -1;
      }
      if (usernameA > usernameB) {
        return 1;
      }
      return 0;
    });
    setAdminsTable(sortedAdminsTable);
  };

  // Search functionality
  const [search, setSearch] = useState("");

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
            Create Admin
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
                        Username
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Name"
                        required=""
                        onChange={(e) => {
                          setUsername(e.target.value);
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
                  </div>
                </form>
              </div>

              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => {
                    insertAdmin();
                  }}
                >
                  Create Admin
                </button>
              </div>
            </div>
          </Modal2>
        </div>
        <table className=" text-sm text-left overflow-y-scroll text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {adminsTable
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.username
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((admin, i) => {
                return (
                  <tr
                    key={admin.Id}
                    className="bg-white border-b h-[70px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py- h-[70px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {admin.username}
                    </th>
                    <td className="px-6 h-[70px] py-2">{admin.email}</td>
                    <td className="px-2  h-[70px] truncate w-1/2 py-2">
                      {admin.password.slice(0, 6)}
                    </td>

                    <td className="px-6 h-[70px] py-2 text-right">
                      <button
                        onClick={() => {
                          console.log(admin.admin_id);
                          deleteAdmin(admin.admin_id);
                        }}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                      >
                        <BsFillTrash3Fill />
                      </button>
                      <button
                        className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                        onClick={() => {
                          setAdminId((adminId = admin.admin_id));
                          setUsernameUpdated(
                            (usernameUpdated = admin.username)
                          );
                          setEmailUpdated((emailUpdated = admin.email));
                          setPasswordUpdated(
                            (passwordUpdated = admin.password)
                          );

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
                                  Update User with Id: {adminId}
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
                                          setUsernameUpdated(e.target.value);
                                        }}
                                        value={usernameUpdated}
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
                                  </div>
                                  <br></br>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log(adminId);
                                      updateAdmin(adminId);
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

export default AdminTable;

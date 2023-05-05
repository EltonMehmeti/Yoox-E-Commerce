import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { useModal } from "react-hooks-use-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Category = () => {
  const [categoryTable, setCategoryTable] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/category")
      .then((response) => {
        setCategoryTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // delete category function
  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3001/api/deleteCategory/${id}`)
      .then((response) => {
        setCategoryTable(categoryTable.filter((val) => val.id !== id));
        window.location.reload();
      });
  };

  //
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
 

  // insert category function
  const insertCategory = () => {
    axios
      .post(`http://localhost:3001/api/insertCategory`, {
        name: name,
        img: img,
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

  // update category function
  const [nameU, setNameUpdated] = useState("");
  const [imgU, setImgU] = useState("");

  const Swal = require("sweetalert2");
  const updateCategory = (id) => {
    axios
      .put(`http://localhost:3001/api/updateCategory/${id}`, {
        nameU: nameU,
        imgU: imgU,
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
  let [categoryId, setCategoryId] = useState(null);

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
   
    <div className="row-auto flex items-center justify-start h-screen">
      <Sidebar />
      <div className="relative overflow-x-auto ml-80 shadow-md sm:rounded-lg">
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            open2();
          }}
        >
          Create Category
        </button>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <Modal2>
            <div className="bg-white p-14 rounded-xl">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold dark:text-white">Add New</h3>
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
                        Img
                      </label>
                      <input
                        type="file"
                        name="img"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Password"
                        required=""
                        onChange={(e) => {
                          setImg(e.target.value);
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
                    insertCategory();
                  }}
                >
                  Create Category
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
                Img
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            
          
          
          
          
          
          {categoryTable.map((category, i) => {
              return (
                <tr
                  key={category.Id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.Name}
                  </th>
                  <td className="px-6 py-4">{category.Name}</td>
                  <td className="px-6 py-4">{category.Img}</td>
                  
                 
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        console.log(category.Id);
                        deleteCategory(category.Id);
                      }}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                    >
                      <BsFillTrash3Fill />
                    </button>
                    <button
                      className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                      onClick={() => {
                        setCategoryId((categoryId = category.Id));
                        // console.log(CategoryId);
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
                                Update Category with Id: {categoryId}
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
                                      placeholder="Type category name"
                                      required=""
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label
                                      for="emailU"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Img
                                    </label>
                               
                                    <input
                                      onChange={(e) => {
                                        setImgU(e.target.value);
                                      }}
                                      type="file"
                                      name="imgU"
                                      id="price"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder="Image"
                                      required=""
                                    />
                                  </div>
                                  <div className="w-full">
                                    <label
                                      for="addressU"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                     
                                    </label>
                                   </div>
                                  
                                  </div>
                                  <br></br>
                                  <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(categoryId);
                                    updateCategory(categoryId);
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

export default Category;

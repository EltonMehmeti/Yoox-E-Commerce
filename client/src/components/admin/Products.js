import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsSortNumericDown } from "react-icons/bs";
import { useModal } from "react-hooks-use-modal";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

const Products = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [productsTable, setProductsTable] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [mostSold, setMostSold] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/products")
      .then((response) => {
        setProductsTable(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get("http://localhost:3001/mostsold").then((response) => {
      setMostSold(response.data);
      console.log(mostSold);
    });
  }, []);
  // delete product function
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/api/deleteProduct/${id}`)
      .then((response) => {
        setProductsTable(productsTable.filter((val) => val.id !== id));
        window.location.reload();
      });
  };

  //
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  // insert product function
  // insert product function
  const insertProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("images", img1);
    formData.append("images", img2);
    formData.append("images", img3);

    axios
      .post(`http://localhost:3001/api/insertProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  // update product function
  let [nameU, setNameUpdated] = useState("");
  let [descU, setDescU] = useState("");
  let [img1U, setImg1U] = useState("");
  let [img2U, setImg2U] = useState("");
  let [img3U, setImg3U] = useState("");
  let [priceU, setPriceU] = useState("");
  let [stockU, setStockU] = useState("");
  let [categoryU, setCategoryU] = useState("");
  const Swal = require("sweetalert2");
  const updateProduct = (id) => {
    const formData = new FormData();
    formData.append("nameU", nameU);
    formData.append("descU", descU);
    formData.append("priceU", priceU);
    formData.append("stockU", stockU);
    formData.append("categoryU", categoryU);
    formData.append("images", img1U);
    formData.append("images", img2U);
    formData.append("images", img3U);

    axios
      .put(`http://localhost:3001/api/updateProduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error Updating Product",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  let [productId, setProductId] = useState(null);
  // update modal

  const sort = () => {
    const sortedByPrice = [...productsTable].sort((a, b) => a.Price - b.Price);
    setProductsTable(sortedByPrice);
  };
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center justify-start h-screen">
      <Sidebar />
      <div className="relative overflow-x-auto ml-20 w-[75%] h-[70%] shadow-md sm:rounded-lg">
        <div className="flex border-2">
          <div className="bg-white border-2 dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-62 p-4 m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="p-2 rounded-full bg-[#ebfaf2] border">
                  <MdOutlineAccountBalanceWallet fill="#5fd8b9" size={32} />
                </span>
                <div className="ml-2">
                  <p className="font-bold text-gray-400">Most Sold</p>
                  <p className="text-lg mt-1">{mostSold.product_name}</p>
                  <p className="text-lg font-bold mt-1">
                    {mostSold.total_sold}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-lg opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-2"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-2">
              <button color="white" text="Download" borderRadius="10px" />
            </div>
          </div>
          <div className="bg-white border-2 dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-62 p-4 m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="p-2 rounded-full bg-[#ebfaf2] border">
                  <MdOutlineAccountBalanceWallet fill="#5fd8b9" size={32} />
                </span>
                <div className="ml-2">
                  <p className="font-bold text-gray-400">Most Sold</p>
                  <p className="text-lg mt-1">{mostSold.product_name}</p>
                </div>
              </div>
              <button
                type="button"
                className="text-lg opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-2"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-2">
              <button color="white" text="Download" borderRadius="10px" />
            </div>
          </div>
        </div>

        <div className="flex flex-row p-4 justify-around items-center">
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              open2();
            }}
          >
            Create Product
          </button>
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
            placeholder="Search By Name"
            required
          />
        </div>
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
                        Description
                      </label>
                      <input
                        type="text"
                        name="desc"
                        id="last-name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Description"
                        required=""
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Img1
                      </label>
                      <input
                        type="file"
                        name="img1"
                        id="email"
                        className="..."
                        placeholder="Password"
                        required=""
                        onChange={(e) => {
                          setImg1(e.target.files[0]); // Store the selected file
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Img2
                      </label>
                      <input
                        type="file"
                        name="img2"
                        id="position"
                        className="..."
                        placeholder="Address"
                        required=""
                        onChange={(e) => {
                          setImg2(e.target.files[0]); // Store the selected file
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="biography"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        img3
                      </label>
                      <input
                        type="file"
                        name="img3"
                        id="position"
                        className="..."
                        placeholder="City"
                        required=""
                        onChange={(e) => {
                          setImg3(e.target.files[0]); // Store the selected file
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Price"
                        required=""
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Stock"
                        required=""
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <input
                        type="number"
                        name="category"
                        id="position"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Category"
                        required=""
                        onChange={(e) => {
                          setCategory(e.target.value);
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
                    insertProduct();
                  }}
                >
                  Create Product
                </button>
              </div>
            </div>
          </Modal2>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Desc
              </th>
              <th scope="col" className="px-6 py-3">
                Img1
              </th>
              <th scope="col" className="px-6 py-3">
                Img2
              </th>
              <th scope="col" className="px-6 py-3">
                Img3
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {productsTable
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.Name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((product, i) => {
                // console.log(product.img1);
                return (
                  <tr
                    key={product.Id}
                    className="bg-white border-b h-[70px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.Name}
                    </th>
                    <td className="px-6 py-2">
                      {product.Description.slice(0, 60)}
                    </td>
                    <td scope="row" class="px-6 py-2">
                      {product.Img1 && (
                        <img
                          src={`http://localhost:3001${product.Img1}`}
                          alt={product.Img1}
                          className="w-8 h-8 mr-3"
                        />
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {product.Img2 && (
                        <img
                          src={`http://localhost:3001${product.Img2}`}
                          alt={product.Img2}
                          className="w-8 h-8 mr-3"
                        />
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {product.Img3 && (
                        <img
                          src={`http://localhost:3001${product.Img3}`}
                          alt={product.Img3}
                          className="w-8 h-8 mr-3"
                        />
                      )}
                    </td>

                    <td className="px-6 py-2">{product.Price}</td>
                    <td className="px-6 py-2">{product.Stock}</td>
                    <td className="px-6 py-2">{product.CategoryId}</td>
                    <td className="px-6 py-2 text-right">
                      <button
                        onClick={() => {
                          console.log(product.Id);
                          deleteProduct(product.Id);
                        }}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                      >
                        <BsFillTrash3Fill />
                      </button>
                      <button
                        className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                        onClick={() => {
                          setProductId((productId = product.Id));
                          setNameUpdated((nameU = product.Name));
                          setDescU((descU = product.Description));
                          setPriceU((priceU = product.Price));
                          setStockU((stockU = product.Stock));
                          setCategoryU((categoryU = product.CategoryId));
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
                                  Update Product with Id: {productId}
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
                                        value={nameU}
                                        type="text"
                                        name="nameU"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required=""
                                      />
                                    </div>
                                    <div className="w-full">
                                      <label
                                        for="emailU"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Description
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setDescU(e.target.value);
                                        }}
                                        value={descU}
                                        type="text"
                                        name="descU"
                                        id="brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Description"
                                        required=""
                                      />
                                    </div>
                                    <div className="w-full">
                                      <label
                                        for="passwordU"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Img1
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setImg1U(e.target.value);
                                        }}
                                        type="file"
                                        name="img1U"
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
                                        Img2
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setImg2U(e.target.value);
                                        }}
                                        type="file"
                                        name="img2U"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Image"
                                        required=""
                                      />
                                    </div>
                                    <div>
                                      <label
                                        for="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Img3
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setImg3U(e.target.value);
                                        }}
                                        type="file"
                                        name="img3U"
                                        placeholder="Image"
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        for="item-weight"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Price
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setPriceU(e.target.value);
                                        }}
                                        value={priceU}
                                        type="number"
                                        name="priceU"
                                        id="item-weight"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Price"
                                        required=""
                                      />
                                    </div>
                                    <div className="">
                                      <label
                                        for="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Stock
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setStockU(e.target.value);
                                        }}
                                        value={stockU}
                                        type="text"
                                        name="stockU"
                                        id="item-weight"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Stock"
                                        required=""
                                      />
                                    </div>
                                    <div>
                                      <label
                                        for="item-weight"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Category
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          setCategoryU(e.target.value);
                                        }}
                                        value={categoryU}
                                        type="number"
                                        name="categoryU"
                                        id="item-weight"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Category"
                                        required=""
                                      />
                                    </div>
                                  </div>
                                  <br></br>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log(productId);
                                      updateProduct(productId);
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

export default Products;

import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import axios from "axios";
import ProductsTemplate from "../components/ProductsTemplate";
import ScrollToTop from "react-scroll-up";
import Pagination from "../components/Pagination";
import Page404 from "../components/404";
import Footer from "../components/Footer";

const AllProducts = () => {
  const [productsTable, setProductsTable] = useState([]);
  const [categoriesTable, setCategoriesTable] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/products")
      .then((response) => {
        setProductsTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/category")
      .then((response) => {
        setCategoriesTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //
  const handleCar = (Cat) => {
    setCategory(Cat);

    console.log(category);
  };
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = productsTable.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Header />
      <div className="mt-10  flex w-full p-2 bg-gray-100   border-b-2 items-center flex-wrap justify-center flex-row gap-4">
        <div className="p-10">
          <h1 className="text-[#24292F] text-[49px]"></h1>

          <label for="voice-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              id="voice-search"
              class="bg-gray-50 border w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Products"
              required
            />
          </div>
        </div>
        {categoriesTable?.map((category, i) => {
          console.log(category);
          return (
            <span
              onClick={() => {
                handleCar(category.Id);
              }}
              class="flex flex-col cursor-pointer items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.Name}
                </h5>
              </div>
            </span>
          );
        })}
      </div>

      <div className=" px-32 bg-gray-100 py-20">
        <div
          id="products"
          className="flex flex-row items-center justify-center flex-wrap gap-6"
        >
          {currentProducts.length > 0 ? (
            currentProducts
              .filter((val) => {
                const isNameMatch =
                  search === "" ||
                  val.Name.toLowerCase().includes(search.toLowerCase());
                const isCategoryMatch =
                  category === "" || val.CategoryId === category;
                return isNameMatch && isCategoryMatch;
              })
              .map((product, i) => (
                <ProductsTemplate
                  key={i}
                  id={product.Id}
                  name={product.Name}
                  desc={product.Description}
                  price={product.Price}
                  img={`http://localhost:3001${product.Img1}`}
                  stock={product.Stock}
                />
              ))
          ) : (
            <Page404 />
          )}

          <ScrollToTop showUnder={160}>
            <button
              type="button"
              class="text-gray-700 border rotate-[-90deg] border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </ScrollToTop>
        </div>
        <div className="mt-[5rem] ml-20">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productsTable.length}
            paginate={paginate}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;

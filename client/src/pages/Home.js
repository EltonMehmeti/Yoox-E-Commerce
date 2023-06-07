import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import Header from "../components/Header";
import axios from "axios";
import ProductsTemplate from "../components/ProductsTemplate";
import ScrollToTop from "react-scroll-up";
import Intro from "../img/intro.png";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import budsW from "../img/nothingW.webp";
import budsB from "../img/nothingB.webp";
import buds3 from "../img/nothing3.webp";
import nVideo from "../img/nothingVideo.mp4";
// Import Swiper styles

import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper";
import Page404 from "../components/404";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import { AiFillEye } from "react-icons/ai";

const Home = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data.user[0].Name);
        setUsername(response.data.user[0].Name);
      }
    });
  }, []);
  const [productsTable, setProductsTable] = useState([]);
  const [categoriesTable, setCategoriesTable] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/products")
      .then((response) => {
        const limitedProducts = response.data.slice(0, 5);
        setProductsTable(limitedProducts);
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
  return (
    <div>
      <div className="top-0 z-50 sticky">
        <Header username={username} />
      </div>

      <div className="flex flex-wrap flex-row  bg-[#24292F]   ">
        <div id="left" className="w-2/3 overflow-hidden p-40">
          <p
            className="text-clip text-[#bebcbe] text-xl"
            style={{ fontFamily: "Geo, sans-serif" }}
          >
            New Arrival
          </p>
          <h1
            className="text-[#bebcbe] text-[89px] first-letter:text-[#d31e2b]"
            style={{ fontFamily: "Geo, sans-serif" }}
          >
            Nothing
          </h1>
          <p
            className="text-clip text-[#bebcbe] text-xl"
            style={{ fontFamily: "Geo, sans-serif" }}
          >
            Tech gets in the way too often. Of what we want to experience. The
            sensations. The emotions. Ear (stick) takes away those walls. This
            is tech you can’t feel. So you can experience everything els
          </p>
          <br></br>
          <div className="flex flex-row ">
            <button
              type="button"
              class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
            >
              <svg
                class="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                ></path>
              </svg>
              Read More
            </button>
            <button
              type="button"
              class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
            >
              <SlBasket />
              Add to Cart
            </button>
          </div>
        </div>
        <div id="right" className="w-1/3 p-10 flex items-center justify-center">
          {/* <img src={Intro} className="h-[300px] w-[100%]" /> */}
          <Swiper
            effect={"cube"}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={true}
            modules={[EffectCube, Pagination]}
          >
            <SwiperSlide className="flex items-center justify-center">
              <video
                className="h-full w-full object-contain"
                src={nVideo}
                autoPlay
                loop
                muted
              />
              <img src={buds3} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={budsB} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={budsW} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mt-10  flex w-full p-2 bg-gray-100   border-b-2 items-center flex-wrap justify-center flex-row gap-4">
        {categoriesTable?.map((category, i) => {
          console.log(category);
          return (
            <div
              key={i}
              className=" flex p-2 cursor-pointer border-b-2 items-center justify-center w-50 h-16 text-center  left-1/4 "
            >
              <img src="" />
              <span
                onClick={() => {
                  handleCar(category.Id);
                }}
                className=" text-black text-xl font-bold text-center"
              >
                <h1>
                  {category.Id} - {category.Name}
                </h1>
              </span>
            </div>
          );
        })}
      </div>

      <div className=" px-32 bg-gray-100 py-20">
        <div className="p-10">
          <h1 className="text-[#24292F] text-[49px]">New Arrivals</h1>

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
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
          </div>
        </div>
        <div
          id="products"
          className="flex flex-row items-center justify-center flex-wrap gap-6"
        >
          {productsTable.length > 0 ? (
            productsTable
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
        <Link to={"/allproducts"}>
          <button
            type="button"
            class="text-white absolute right-6 gap-2 self-end justify-self-end bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          >
            <AiFillEye />
            View More
          </button>
        </Link>
      </div>
      <div className="sticky ml-4 bottom-4">
        <Chat />
      </div>
      <>
        <Footer />
      </>
    </div>
  );
};

export default Home;

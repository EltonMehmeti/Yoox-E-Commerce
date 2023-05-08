import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "./Header";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
const SingleProduct = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const id = location.pathname.split("/")[2];
    console.log(id);
    axios.get(`http://localhost:3001/product/${id}`).then((response) => {
      console.log(response.data[0]);
      const data = response.data[0];
      setName(data.Name);
      setDesc(data.Description);
      setImg1(data.img1);
      setImg2(data.img2);
      setImg3(data.img3);
      setPrice(data.Price || 0); // Set price to 0 if it's null
      setStock(data.Stock || 0); // Set stock to 0 if it's null
    });
  }, []);

  return (
    <>
      <Header />
      {/* <h1 className="absolute top-32 left-20">Home-Product-{id}</h1> */}

      <nav class="flex absolute top-32 left-20" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a
              href="http://localhost:3000/"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Product
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-row p-40 gap-4 h-screen border">
        <div id="left" className="w-3/4 px-10 flex ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-3/4 p-0"
          >
            <SwiperSlide>
              <img
                className=" h-full"
                src="https://w7.pngwing.com/pngs/961/642/png-transparent-iphone-14-pro.png"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full"
                src="https://plus.unsplash.com/premium_photo-1672243970579-8cd2d0e9e0b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full"
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex w-1/3   justify-center flex-col gap-4">
          <h1 class="text-gray-900 font-bold text-xl mb-2">{name}</h1>
          <h3 class="text-gray-700 text-base">{desc}</h3>
          <h1 className="font-bold">{price}$</h1>
          <p class="text-gray-600">Stock: {stock}</p>
          <button className=" hover:border-2 w-24">Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

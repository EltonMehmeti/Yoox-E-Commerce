import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "./Header";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Swal from "sweetalert2";
import { CartContext } from "../pages/client/CartContext";

const SingleProduct = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [brand, setBrand] = useState("");
  const [countryImg, setCountryImg] = useState(null);
  const [category, setCategory] = useState(null);
  const [varVal, setVarVal] = useState([]);
  const [varNames, setVarNames] = useState([]);
  const id = Number(location.pathname.split("/")[2]);
  const cart = useContext(CartContext);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    axios
      .get(`http://localhost:3001/product/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setDesc(data.Description);
        setImg1(data.Img1);
        setImg2(data.Img2);
        setImg3(data.Img3);
        setPrice(data.Price || 0); // Set price to 0 if it's null
        setStock(data.Stock || 0); // Set stock to 0 if it's null
        setCountryImg(data.country_image);
        setCategory(data.category_name);
        setBrand(data.Brand);
        const uniqueNames = Array.from(
          new Set(data.variation_names.split(","))
        );
        setVarNames(uniqueNames);
        setVarVal(data.variation_values.split(","));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const productQuantity = cart.getProductQuantity(id);
  const [user_id, setUserId] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        setUserId(response.data.user[0].Id);
      }
    });
  }, []);
  // Function to submit the rating to the server
  const submitRating = () => {
    // Make an API request to your server to submit the rating
    if (user_id != null) {
      axios
        .post("http://localhost:3001/product/ratings", {
          user_id: user_id,
          productId: Number(id),
          rating: selectedRating, // Use the selectedRating state value here
        })
        .then((response) => {
          // Rating submitted successfully, you can show a success message or handle any other feedback to the user
          Swal.fire("Success", "Rating submitted successfully!", "success");
          // Optionally, you can also update the state or perform any other actions after successful submission
        })
        .catch((error) => {
          // Handle the error, e.g., display an error message
          console.log(error);
          Swal.fire("Error", "Failed to submit rating.", "error");
        });
    } else {
      alert("You need to sign in first! So we now who is rating :)");
    }
  };
  const [selectedRating, setSelectedRating] = useState(0);

  // Function to handle clicking on a star
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };
  // Function to reset the rating
  const resetRating = () => {
    setSelectedRating(0);
  };
  return (
    <>
      <Header />
      {/* <h1 className="absolute top-32 left-20">Home-Product-{id}</h1> */}

      <nav className="flex absolute top-32 left-20" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="http://localhost:3000/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
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
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
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
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Product
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
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
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
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
                className=" w-full h-full object-contain  bg-transparent"
                src={`http://localhost:3001${img1}`}
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                className=" w-full h-full object-contain  bg-transparent"
                src={`http://localhost:3001${img2}`}
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-contain  bg-transparent"
                src={`http://localhost:3001${img3}`}
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex w-1/3   justify-center flex-col gap-4">
          <h2 class="text-gray-500 font-semibold text-md mb-2">{brand}</h2>
          <h1 class="text-gray-900 font-bold text-xl mb-2">{name}</h1>
          <img
            src={`http://localhost:3001${countryImg}`}
            alt={countryImg}
            className="w-6 rounded-full h-6 mr-3"
          />
          <h3 class="text-gray-700 text-base">{desc}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {varNames?.map((vari, i) => (
                <div key={i}>
                  <h1 className="font-bold">{vari}:</h1>
                </div>
              ))}
            </div>
            <div>
              {varVal?.map((vari, i) => (
                <div key={i}>
                  <h1>{vari}</h1>
                </div>
              ))}
            </div>
          </div>

          <h1 className="font-bold">{price}$</h1>
          <p class="text-gray-600">Stock: {stock}</p>
          <h3>In Cart:{productQuantity}</h3>
          {productQuantity > 0 ? (
            <>
              <div className="flex  flex-col justify-evenly">
                <button
                  onClick={() => {
                    cart.addOneToCart(Number(id));
                  }}
                  className="text-white w-[3rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  +
                </button>
                <br />
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => cart.deleteFromCart(id)}
                >
                  Remove from Cart
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                cart.addOneToCart(Number(id));
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          )}
          <div className="flex items-center space-x-2 mb-5">
            {[1, 2, 3, 4, 5].map((rating) => (
              <svg
                key={rating}
                className={`w-6 h-6 ${
                  rating <= selectedRating ? "text-yellow-300" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onClick={() => handleStarClick(rating)}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <button
              onClick={submitRating}
              type="button"
              class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span class="sr-only"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

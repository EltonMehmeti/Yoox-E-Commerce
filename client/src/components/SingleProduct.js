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
      <div className="flex flex-row p-40 gap-10 h-screen border">
        <div id="left" className="w-3/4 p-10 flex">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="p-10"
          >
            <SwiperSlide>
              <img className="w-full h-full" src={img1}></img>
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
              ></img>{" "}
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex w-1/3  justify-center flex-col gap-4">
          <h1 class="text-gray-900 font-bold text-xl mb-2">{name}</h1>
          <h3 class="text-gray-700 text-base">{desc}</h3>
          <h1 className="font-bold">{price}$</h1>
          <p class="text-gray-600">Stock: {stock}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

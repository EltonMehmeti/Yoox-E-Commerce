import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const SwiperComponent = ({ products }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  const swiperStyles = {
    width: "100%",
    height: "100%",
  };

  const slideStyles = {
    textAlign: "center",
    fontSize: "18px",
    background: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const autoplayProgressStyles = {
    position: "absolute",
    right: "16px",
    bottom: "16px",
    zIndex: 10,
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "var(--swiper-theme-color)",
  };

  const svgStyles = {
    "--progress": 0,
    position: "absolute",
    left: "0",
    top: "0px",
    zIndex: 10,
    width: "100%",
    height: "100%",
    strokeWidth: "4px",
    stroke: "var(--swiper-theme-color)",
    fill: "none",
    strokeDashoffset: "calc(125.6 * (1 - var(--progress)))",
    strokeDasharray: "125.6",
    transform: "rotate(-90deg)",
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div style={{ height: "50vh" }}>
      <Swiper
        style={swiperStyles}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {products.map((product, i) => {
          return (
            <SwiperSlide style={slideStyles} key={i}>
              <a
                href="#"
                className="flex flex-col w-full items-center  bg-white h-full rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  src={`http://localhost:3001${product.Img1}`}
                  alt={product.Img1}
                  className="w-1/3"
                  style={{ height: "auto", aspectRatio: "4/5" }}
                />

                <div className="flex flex-col justify-between text-center items-center p-10 leading-normal">
                  <h1 className="font-extrabold text-4xl text-gray-400 mb-20">
                    Arrival this week
                  </h1>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.Name}
                  </h5>
                  <p className="mb-3 font-normal w-2/4 text-center text-gray-700 dark:text-gray-400">
                    {product.Description}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          );
        })}
        <div style={autoplayProgressStyles} slot="container-end">
          <svg viewBox="0 0 48 48" style={svgStyles}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;

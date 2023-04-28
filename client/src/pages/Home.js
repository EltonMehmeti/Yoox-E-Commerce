import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import Header from "../components/Header";
import axios from "axios";
const Home = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/api/loginStatus").then((response) => {
      if (response.data.loggedIn === true) {
        setUsername(response.data.user[0].Name);
      }
    });
  }, []);
  const data = [
    {
      id: 1,
      title: "Product A",
      img: "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhlYWRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nisi euismod, interdum justo quis, finibus nulla. Proin consequat ante eget lacinia varius.",
    },
    {
      id: 2,
      title: "Product B",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desc: "Nullam ornare velit vel lorem fermentum, a lacinia nisi bibendum. Nullam id sapien semper, imperdiet mi vel, convallis metus.",
    },
    {
      id: 3,
      title: "Product C",
      img: "https://images.unsplash.com/photo-1557063673-0493e05da49f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      desc: "In euismod est sit amet odio maximus vestibulum. Aenean eu augue eget nibh bibendum finibus. Sed euismod dolor in libero tristique, non auctor mi sagittis.",
    },
    {
      id: 4,
      title: "Product D",
      img: "https://dummyimage.com/300x200/000/fff&text=Product+D",
      desc: "Vivamus eu dolor ut orci posuere tincidunt vel nec lacus. Praesent in velit quis risus porttitor lobortis a vitae odio. Sed quis tellus ut velit volutpat maximus.",
    },
  ];
  console.log(data);
  return (
    <div>
      <Header username={username} />
      <div className="flex flex-wrap flex-row bg-orange-500  bg-[#201f20] ">
        <div id="left" className="w-2/3 overflow-hidden p-40">
          <h1 className="text-[#bebcbe] text-[89px]">Mackbook 14 Pro</h1>
          <p className="text-clip text-[#bebcbe] text-xl">
            Supercharged M2 Pro or M2 Max, Mackbook Pro takes its powe and
            efficiency further than ever. It delivers exceptional peformance
            wether its plugged or not.
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
          <img
            src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png"
            className="h-[300px] w-[100%]"
          />
        </div>
      </div>
      <div className=" px-40 py-20">
        <h1 className="text-[#24292F] text-[49px]">New Arrivals</h1>
        <div className="flex flex-row flex-wrap gap-6">
          {data.map((element) => (
            <a
              key={element.id}
              href="#"
              class="flex flex-col items-center mt-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class=" object-cover w-full rounded-t-lg h-full md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
                src={element.img}
                alt=""
                className="w-[500px] h-[250px]"
              />
              <div class="flex flex-col justify-between p-4 leading-normal overflow-hidden">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {element.title}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
                  {element.desc}
                </p>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-40 h-25"
                >
                  Add To Cart
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

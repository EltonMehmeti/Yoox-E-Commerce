import React, { useState } from "react";

function App() {
  let [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
        Hello Ekipa ma e fort qetu i thirrni komponentat qe duhet!
      </h1>
      <p className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {count}
      </p>
      <button
        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click !
      </button>
      <button
        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          setCount((count = 0));
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;

import React from "react";
import { GoChecklist } from "react-icons/go";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { FaHome } from "react-icons/fa";

function ProgressBar({ progress }) {
  return (
    <div className="w-[84%] bg-gray-300 rounded overflow-hidden">
      <div
        className="bg-slate-500   h-15 leading-none py-1 text-center text-white"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}
const progressValue = 75;
const Delivery = ({ progress }) => {
  return (
    <div className="h-screen w-full  flex justify-center bg-[#24292F] ">
      <div className="  m-auto md:grid-cols-4 bg-white rounded-lg ">
        <form className="grid w-[950px] h-[300px] ">
          <div className="px-6 pt-5">
            <h1 className="font-bold text-4xl ">Order #56756</h1>
          </div>
          <div className=" text-4xl flex items-center justify-center">
            <ProgressBar progress={progress} />
          </div>
          <div className="flex justify-center items-end p-3   gap-12">
            <div className=" flex gap-1 mr-4 ">
              <GoChecklist className="text-5xl  " />
              <h4 className=" font-bold text-slate-500">Order processed</h4>
            </div>
            <div className=" flex  gap-1 mr-4">
              <BsBoxSeamFill className="text-5xl" />
              <h4 className="font-bold  text-slate-500">Order shipped</h4>
            </div>
            <div className=" flex  gap-1  mr-4">
              <MdLocalShipping className="text-5xl" />
              <h4 className="font-bold text-slate-500 ">Order on route</h4>
            </div>
            <div className=" flex  gap-1 mr-4">
              <FaHome className="text-5xl" />
              <h4 className="font-bold text-slate-500">Order arrived</h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Delivery;

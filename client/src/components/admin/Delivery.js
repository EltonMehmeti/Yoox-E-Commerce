import React from "react";
import { GoChecklist } from "react-icons/go";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { GiBoxUnpacking } from "react-icons/gi";

const Delivery = ({ status }) => {
  const getProgressBarWidth = () => {
    if (status === "selectServer") {
      return "0%";
    } else if (status === "addUser") {
      return "33%";
    } else if (status === "setting") {
      return "66%";
    } else if (status === "finished") {
      return "100%";
    }
  };

  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <MdPendingActions className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Pending</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className="bg-green-300 py-1 rounded"
                  style={{ width: getProgressBarWidth() }}
                ></div>
              </div>
            </div>

            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <GiBoxUnpacking className="w-full fill-current" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Packing</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className="w-0 bg-green-300 py-1 rounded"
                  style={{ width: getProgressBarWidth() }}
                ></div>
              </div>
            </div>

            <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-gray-600 w-full">
                <MdLocalShipping className="w-full fill-current" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Delivered</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

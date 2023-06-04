import React from "react";
import { GiBoxUnpacking } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

const Delivery = ({ status }) => {
  const getProgressBarWidth = () => {
    if (status.toLowerCase() === "pending") {
      return "0%";
    } else if (status.toLowerCase() === "packing") {
      return "50%";
    } else if (status.toLowerCase() === "delivered") {
      return "100%";
    }
  };

  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className={`w-10 h-10 mx-auto ${
                status.toLowerCase() === "pending" ||
                status.toLowerCase() === "packing" ||
                status.toLowerCase() === "delivered"
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }    rounded-full text-lg  flex items-center`}
            >
              <span className="text-center  w-full">
                <MdPendingActions className="w-full fill-current" />
              </span>
            </div>
          </div>
          <div className="text-xs text-center md:text-base">Pending</div>
        </div>

        <div className="w-1/3">
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
                  className={`bg-green-300 py-1 rounded ${
                    status.toLowerCase() === "packing" ||
                    status.toLowerCase() === "delivered"
                      ? "w-full"
                      : "w-0"
                  }`}
                  // style={{ width: getProgressBarWidth() }}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto border-2 ${
                status.toLowerCase() === "packing" ||
                status.toLowerCase() === "delivered"
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }    rounded-full text-lg text-white flex items-center`}
            >
              <span className="text-center fill-current w-full">
                <GiBoxUnpacking className="w-full fill-current" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Packing</div>
        </div>

        <div className="w-1/3">
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
                  className={`bg-green-300 py-1 rounded ${
                    status.toLowerCase() === "delivered" ? "w-full" : "w-0"
                  }`}
                  // style={{ width: getProgressBarWidth() }}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto border-2 ${
                status.toLowerCase() === "delivered"
                  ? "bg-green-500 text white"
                  : "bg-white text-black"
              }    rounded-full text-lg text-white flex items-center`}
            >
              <span className="text-center fill-current  w-full">
                <MdLocalShipping className="w-full fill-current" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Delivered</div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

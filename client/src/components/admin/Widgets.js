import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
export default function Widgets(props) {
  return (
    <div className="flex h-28 mt-5 ml-6 gap-20">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Products
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {props.products}
            </strong>
            <span className="text-sm text-green-500 pl-2">+343</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              $3423
            </strong>
            <span className="text-sm text-green-500 pl-2">-343</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {props.users}
            </strong>
            <span className="text-sm text-red-500 pl-2">-30</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            New Costumer this week
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {props.newUsers}
            </strong>
            <span className="text-sm text-red-500 pl-2">-30</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

export const SideWidget = ({ products }) => {
  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {products
        ?.map((product) => {
          return (
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`http://localhost:3001${product.Img1}`}
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {product.Name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    ${product.Price} | Total ratings: {product.total_ratings}
                  </p>
                  <p className=" text-xs text-gray-500 truncate dark:text-gray-400"></p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {product.avg_rating}
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </li>
          );
        })
        .slice(0, 5)}
    </ul>
  );
};

export const CountryW = ({ items }) => {
  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {items
        ?.map((item) => {
          return (
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`http://localhost:3001${item.CountryImg}`}
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.CountryName}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.TotalProductsSold}
                </div>
              </div>
            </li>
          );
        })
        .slice(0, 5)}
    </ul>
  );
};

export const MidWidgets = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-52 p-4 m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-[#ebfaf2] border">{icon}</span>
          <div className="ml-2">
            <p className="font-bold text-gray-400">{title}</p>
            <p className="text-lg mt-1">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

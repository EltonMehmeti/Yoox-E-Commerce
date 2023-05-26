import React from "react";
import icon1 from "../../img/logo2.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsHouse } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdEmojiTransportation } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Sidebar = (props) => {
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/admin", icon: BsHouse },
    { name: "Settings", link: "/", icon: CiSettings },
    { name: "Users", link: "/users", icon: HiOutlineUsers },
    { name: "Products", link: "/products", icon: MdProductionQuantityLimits },
    { name: "Category", link: "/category", icon: RiBillLine },
    { name: "PostMan", link: "/postman", icon: MdEmojiTransportation },
    { name: "Customer Support", link: "/costumerS", icon: MdSupportAgent },
    { name: "SignOut", link: "/", icon: FaSignOutAlt, margin: true },
  ];
  return (
    <div className="flex gap-6">
      <div className="bg-blue-900 p-6 min-h-screen w-72 text-gray-100  px-4">
        <div className="flex gap-x-3 items-center">
          <img className="flex items-center w-14 rounded-full" src={icon1} />
          <h2 className="font-bold text-white origin-left text-xl  ">
            Hi {props.username}
          </h2>
        </div>

        <div className="mt-8 gap-10 flex flex-col  relative">
          <h1>{props.name}</h1>
          {menus?.map((menu, i) => (
            <ul
              to={menu?.link}
              key={i}
              onClick={() => {
                navigate(menu.link);
              }}
              className="flex cursor-pointer items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>{React.createElement(menu?.icon, { size: "20" })} </div>
              <h2>{menu?.name}</h2>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

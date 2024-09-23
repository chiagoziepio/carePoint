import React, { useState } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
export const Links = [
  {
    key: 1,
    label: (
      <NavLink to={"/"} className={""}>
        Home
      </NavLink>
    ),
    path: "/",
    icon: <IoHomeOutline size={22} />,
  },
  {
    key: 2,
    label: (
      <NavLink to={"/doctors"} className={""}>
        Doctors
      </NavLink>
    ),
    path: "/doctors",
    icon: <FaUserDoctor size={22} />,
  },
  {
    key: 3,
    label: (
      <NavLink to={"/about"} className={""}>
        About
      </NavLink>
    ),
    path: "/about",
    icon: <FaInfoCircle size={22} />,
  },
  {
    key: 4,
    label: (
      <NavLink to={"/contact"} className={""}>
        Contact
      </NavLink>
    ),
    path: "/contact",
    icon: <MdOutlinePhoneCallback size={22} />,
  },
];

const Menus = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className="p-[10px]"
      style={{
        width: isCollapsed ? 80 : 267,
        transition: "width 0.2s ease-in-out",
        height: "100%",
        background : "#fff"
      }}
    >
      <div>
        <div className="ml-[30px] w-fit h-fit mb-[30px] cursor-pointer">
          <CiMenuFries size={30} onClick={()=> setIsCollapsed(!isCollapsed)} />
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <Menu
            mode="inline"
            theme="light"
            items={Links}
            inlineCollapsed={isCollapsed}
            className="ml-[-10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Menus;

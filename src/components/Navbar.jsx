import { Avatar } from "antd";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [isDroppedDown, setIsIsDroppedDown] = useState(false);
  return (
    <div className="sticky top-0 right-0 left-0 z-20">
      <div
        className="p-[7px] flex justify-end relative before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:w-[70%] before:ml-[20%] before:h-[2px] before:bg-[#7C7C7C] "
        style={{
          background: "#fff",
        }}
      >
        <div className="flex gap-x-[20px] mr-[20px]">
          <Avatar size={35} />

          <div>
            <MdNotifications size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

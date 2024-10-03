import { Avatar } from "antd";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../Redux/features/Patients/PatientSlice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isDroppedDown, setIsIsDroppedDown] = useState(false);
  const isDrawerOpen = useSelector(
    (state) => state.PatientReducer.isDrawerOpen
  );
  const patient = useSelector((state) => state.PatientReducer.patient);
  const dispatch = useDispatch();
  return (
    <div className="w-full sticky top-0 right-0 left-0 z-20">
      <div
        className="p-[7px] flex md:justify-end justify-between relative before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:w-[70%] before:ml-[20%] before:h-[2px] before:bg-[#7C7C7C] "
        style={{
          background: "#fff",
        }}
      >
        <RiMenuUnfoldLine
          size={30}
          className="md:hidden block"
          onClick={() => dispatch(toggleDrawer())}
        />
        <div className="flex gap-x-[20px] mr-[20px]">
          {!patient && (
            <button className="bg-bg-banner text-white text-[14px] md:text-[17px] h-fit w-[100px] p-[7px] flex items-center justify-center rounded-[30px]">
              <Link to="/login">Login</Link>
            </button>
          )}

          {patient && <Avatar size={35} />}

          {patient && (
            <div>
              <MdNotifications size={30} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

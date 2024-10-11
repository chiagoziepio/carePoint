import { Avatar } from "antd";
import { MdNotifications } from "react-icons/md";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../Redux/features/Patients/PatientSlice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((state) => state.AppReducer.user);
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
          {!user && (
            <button className="bg-bg-banner text-white text-[14px] md:text-[17px] h-fit w-[100px] p-[7px] flex items-center justify-center rounded-[30px]">
              <Link to="/login">Login</Link>
            </button>
          )}

          {user && (
            <Link
              to={
                user.role === "doctor"
                  ? "/doctor-dashboard"
                  : "/patient-dashboard"
              }
              className="cursor-pointer"
            >
              <Avatar
                size={35}
                src={user.role === "doctor" ? user.doctorPic : user.pic}
              />
            </Link>
          )}

          {user && (
            <div>
              <Link
                to={
                  user.role === "doctor"
                    ? "/doctor-notification"
                    : "/notification"
                }
                className="cursor-pointer"
              >
                <MdNotifications size={30} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

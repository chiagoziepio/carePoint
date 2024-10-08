import { useState } from "react";
import { Drawer, Menu, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../Redux/features/Patients/PatientSlice";
import { AiOutlineClose } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { usePatientLogoutMutation } from "../Redux/features/Patients/PatientApi";
import { MdAddToPhotos } from "react-icons/md";

const Menus = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDrawerOpen = useSelector(
    (state) => state.PatientReducer.isDrawerOpen
  );
  const patient = useSelector((state) => state.PatientReducer.patient);
  const [patientLogout] = usePatientLogoutMutation();

  const navigate = useNavigate();
  const handlePatientLogout = async () => {
    if (!patient._id) return;
    try {
      await patientLogout({ _id: patient._id }).unwrap();
      navigate("/login");
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  const Links = [
    {
      key: 1,
      label: (
        <NavLink to={"/"} className={""}>
          Home
        </NavLink>
      ),
      path: "/",
      icon: <IoHomeOutline size={22} />,
      visible: true,
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
      visible: true,
    },
    {
      key: 3,
      label: (
        <NavLink to={"/about"} className="">
          About
        </NavLink>
      ),
      path: "/about",
      icon: <FaInfoCircle size={22} />,
      visible: true,
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
      visible: true,
    },
    {
      key: 5,
      label: (
        <NavLink to={"/admin-create-doctor"} className={""}>
          Add Doctor
        </NavLink>
      ),
      path: "/admin-create-doctor",
      icon: <MdAddToPhotos size={22} />,
      visible: true,
    },
  ];

  const dispatch = useDispatch();
  return (
    <div
      className="pl-[10px] pt-[10px] h-full hidden md:block top-0 left-0"
      style={{
        width: isCollapsed ? 80 : 267,
        transition: "width 0.2s ease-in-out",
        height: "100%",
        background: "#fff",
      }}
    >
      <div className="h-[600px] sticky top-[40px] flex flex-col justify-between">
        <div>
          <div
            className={`flex items-center gap-x-[13px] justify-between mb-[30px] ${
              isCollapsed && "justify-center"
            }`}
          >
            <div className={`w-fit  cursor-pointer `}>
              <CiMenuFries
                size={30}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </div>
            {!isCollapsed && (
              <div className="flex items-center">
                <img src="/assests/logo.svg" alt="" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start w-full">
            <Drawer placement="left" open={isDrawerOpen} width={"80%"}>
              <div
                className={`flex items-center gap-x-[13px] justify-between mb-[30px]`}
              >
                <div className={`w-fit  cursor-pointer ml-[10px] `}>
                  <AiOutlineClose
                    size={30}
                    onClick={() => dispatch(toggleDrawer())}
                  />
                </div>

                <div className="flex items-center">
                  <img src="/assests/logo.svg" alt="" />
                </div>
              </div>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {Links.map((link) => (
                  <li
                    key={link.key}
                    onClick={() => dispatch(toggleDrawer())}
                    style={{
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {link.icon}
                    <span
                      style={{ marginLeft: "10px" }}
                      className="text-[17px]"
                    >
                      {link.label}
                    </span>{" "}
                  </li>
                ))}
              </ul>
              {patient && (
                <div
                  className="flex gap-x-[8px] items-center cursor-pointer"
                  onClick={() => {
                    handlePatientLogout(), dispatch(toggleDrawer());
                  }}
                >
                  <span>
                    <MdLogout size={22} />
                  </span>
                  <p className={`outfit-medium text-[17px]`}>Logout</p>
                </div>
              )}
            </Drawer>
            <Menu
              mode="inline"
              theme="light"
              inlineCollapsed={isCollapsed}
              className="ml-[-10px] hidden md:block "
            >
              {Links.filter((link) => link.visible).map((link) => (
                <Menu.Item key={link.key} icon={link.icon}>
                  {link.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>
        {patient && (
          <div
            className="flex gap-x-[8px] items-center cursor-pointer"
            onClick={handlePatientLogout}
          >
            <span>
              <MdLogout size={22} />
            </span>
            <p
              className={`outfit-medium text-[17px] ${isCollapsed && "hidden"}`}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;

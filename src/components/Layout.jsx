import { useEffect } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { tokenChecker } from "../Redux/features/Patients/PatientSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const checkToken = async () => {
    const token = getToken();
    if (token === null) {
      dispatch(tokenChecker());
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkToken();
    }, 500000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow  flex gap-x-[20px]  relative">
        <Menu className="" />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

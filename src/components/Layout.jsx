import { useEffect } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { trackUser } from "../Redux/Api/AppSlice";
import { updatePatientNotiffication } from "../Redux/features/Patients/PatientSlice";
import { updateDocNotification } from "../Redux/features/Doctor/DoctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllDoctorsQuery } from "../Redux/features/Admin/AdminApi";
import axios from "axios";
import { BASE_URL } from "./constants";

const Layout = () => {
  const user = useSelector((state) => state.AppReducer.user);
  const dispatch = useDispatch();
  const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const handleRefetchNotification = async () => {
    const token = getToken();
    if (user) {
      if (user.role !== "doctor") {
        try {
          const res = await axios.get(
            `${BASE_URL}patient/get-notification/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = res.data;
          dispatch(updatePatientNotiffication(data.notifications));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.get(
            `${BASE_URL}doctor/get-notification/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = res.data;
          dispatch(updateDocNotification(data.data));
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const checkToken = async () => {
    const token = getToken();
    if (token === null) {
      dispatch(trackUser(null));
    }
  };

  const { data } = useGetAllDoctorsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefetchNotification();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkToken();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow  flex gap-x-[20px]  relative">
        <Menu className="" />
        <div className="md:w-[90%] ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

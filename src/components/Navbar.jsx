import { Avatar, Badge } from "antd";
import { MdNotifications } from "react-icons/md";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../Redux/features/Patients/PatientSlice";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMarkAsReadNotificationMutation } from "../Redux/features/Doctor/DoctorApi";
import { useMarkAsReadNotificationPatientMutation } from "../Redux/features/Patients/PatientApi";

const Navbar = () => {
  const user = useSelector((state) => state.AppReducer.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();
  const DocNotification = useSelector(
    (state) => state.DoctorReducer.notification
  );
  const PatientNotification = useSelector(
    (state) => state.PatientReducer.notification
  );
  const [markAsReadNotification] = useMarkAsReadNotificationMutation();
  const [markAsReadNotificationPatient] =
    useMarkAsReadNotificationPatientMutation();
  const notification =
    user?.role === "doctor" ? DocNotification : PatientNotification;

  const notificationsArray = useMemo(() => {
    if (Array.isArray(notification)) {
      return [...notification].reverse();
    } else if (notification) {
      return [...notification].reverse();
    } else {
      return [];
    }
  }, [notification]);

  useEffect(() => {
    if (notificationsArray.length > 0) {
      const unread = notificationsArray.filter(
        (notification) => !notification?.isRead
      ).length;
      setUnreadCount(unread);
    }
  }, [notification]);

  const handleMarkAsRead = async () => {
    const notificationIds = notificationsArray.map(
      (notification) => notification._id
    );
    if (notificationIds.length === 0) return;
    try {
      user.role === "doctor"
        ? await markAsReadNotification({ notificationIds }).unwrap()
        : await markAsReadNotificationPatient({ notificationIds }).unwrap();
      setUnreadCount(0);
    } catch (error) {
      console.log(error);
    }
  };
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
                <Badge
                  count={unreadCount}
                  offset={[5, 0]}
                  style={{ fontSize: "13px", height: "16px", width: "16px" }}
                >
                  <MdNotifications size={30} onClick={handleMarkAsRead} />
                </Badge>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useSelector } from "react-redux";
import { useDocClearNotificationMutation } from "../../../Redux/features/Doctor/DoctorApi";
import { message } from "antd";
import { useState } from "react";

const DoctorNotification = () => {
  const notification = useSelector((state) => state.DoctorReducer.notification);
  const [tab, setTab] = useState(null);
  const [DocClearNotification, { isLoading }] =
    useDocClearNotificationMutation();
  const notificationsArray = Array.isArray(notification)
    ? [...notification].reverse()
    : notification
    ? [...notification].reverse()
    : [];

  const handleClearNotification = async (_id) => {
    try {
      await DocClearNotification({ _id }).unwrap();
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div>
        <h3 className="outfit-medium text-[19px]">Notifications</h3>
        {notificationsArray.length ? (
          <div className="mt-[40px] flex flex-col gap-y-[15px]">
            {notificationsArray.map((not) => (
              <div
                key={not?._id}
                className={`${
                  not.notificationType === "Appointment" && "bg-bg-doc"
                } p-[7px] rounded-[5px] w-full md:w-[600px] flex gap-[15px] justify-between`}
              >
                <p className="text-[14px] outfit-small md:text-[17px] ">
                  {not?.text}
                </p>
                <button
                  onClick={() => {
                    setTab(not._id);
                    handleClearNotification(not._id);
                  }}
                  className=" w-[100px] p-[5px] h-[40px] flex justify-center items-center bg-red-900 text-[17px] text-white rounded-[7px]"
                >
                  {tab === not._id && isLoading ? "Clearing" : "Clear"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No Notification</p>
        )}
      </div>
    </div>
  );
};

export default DoctorNotification;

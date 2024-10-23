import { useState } from "react";
import AdminDashboard from "./AdminAppointmtList";
import { useGetAllAppointmentsQuery } from "../../../Redux/features/Admin/AdminApi";
import { Avatar } from "antd";
import Doctors from "./Doctors";
import Patients from "./Patients";

const Panel = () => {
  const [tab, setTab] = useState("tab1");
  const [DocCount, setDocCount] = useState(0);
  const [PatCount, setPatCount] = useState(0);

  const { data: appointment, isLoading } = useGetAllAppointmentsQuery();
  const appointmentData = appointment?.data;
  const theApp = Array.isArray(appointmentData)
    ? [...appointmentData].reverse()
    : appointmentData
    ? [...appointmentData].reverse()
    : [];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <div className="flex flex-wrap w-full gap-[25px] mt-[30px]">
          <div
            onClick={() => setTab("tab1")}
            className={`${
              tab === "tab1"
                ? "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-none flex gap-[15px] items-center cursor-pointer"
                : "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-md flex gap-[15px] items-center cursor-pointer"
            } `}
          >
            <Avatar
              shape="sqaure"
              src="/assests/appointments_icon.svg"
              size={60}
            />
            <div>
              <span>{theApp.length}</span>
              <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                {theApp.length > 1 ? "Appointments" : "Appointment"}
              </h3>
            </div>
          </div>
          <div
            onClick={() => setTab("tab2")}
            className={`${
              tab === "tab2"
                ? "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-none flex gap-[15px] items-center cursor-pointer"
                : "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-md flex gap-[15px] items-center cursor-pointer"
            } `}
          >
            <Avatar src="/assests/doctor_icon.svg" size={60} />
            <div>
              <span>{DocCount}</span>
              <h3 className="outfit-medium text-[20px] my-[6px] ml-[10px] text-[#3c3b3bab]">
                {DocCount > 1 ? "Doctors" : "Doctor"}
              </h3>
            </div>
          </div>
          <div
            onClick={() => setTab("tab3")}
            className={`${
              tab === "tab3"
                ? "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-none flex gap-[15px] items-center cursor-pointer"
                : "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-md flex gap-[15px] items-center cursor-pointer"
            } `}
          >
            <Avatar src="/assests/patients_icon.svg" size={60} />
            <span>{PatCount}</span>
            <h3 className="outfit-medium text-[20px] my-[6px] ml-[10px] text-[#3c3b3bab]">
              {PatCount > 1 ? "Patients" : "Patient"}
            </h3>
          </div>
        </div>
        <h3 className="my-[15px] outfit-medium text-[20px]">Admin Dashboard</h3>
        {tab === "tab1" && <AdminDashboard appointment={theApp} />}
        {tab === "tab2" && (
          <Doctors setDocCount={setDocCount} appointment={theApp} />
        )}
        {tab === "tab3" && <Patients setPatCount={setPatCount} />}
      </div>
    </div>
  );
};

export default Panel;

import { useSelector } from "react-redux";
import { useGetPatientAppointmentQuery } from "../../Redux/features/Patients/PatientApi";
import { Avatar, message } from "antd";
import { useCancelPatientNotificationMutation } from "../../Redux/features/Patients/PatientApi";
import { useState } from "react";

const Appointments = () => {
  const patient = useSelector((state) => state.PatientReducer.patient);
  const [newApp, setNewApp] = useState(null);
  const {
    data: appointments,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPatientAppointmentQuery(patient?._id);

  const [cancelPatientNotification] = useCancelPatientNotificationMutation();
  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div className="mt-[50px] ml-[20px]">
        <p>Failed to fetch Appointments.</p>
        <p>Error: {error.data.msg || "Something went wrong."}</p>
      </div>
    );
  }
  const handleCancelAppointment = async (_id) => {
    try {
      const res = await cancelPatientNotification({ _id }).unwrap();
      const data = res;
      setNewApp(data.data);
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  const appointmentData = newApp ? newApp : appointments?.data;
  const appointmentArray = Array.isArray(appointmentData)
    ? [...appointmentData].reverse()
    : appointmentData
    ? [appointmentData].reverse()
    : [];

  const paidFees = appointmentArray
    ?.filter((app) => app.status === "Done")
    .reduce((total, appointment) => {
      return total + appointment.fee;
    }, 0);
  const ToBePaidFee = appointmentArray
    ?.filter((app) => app.status === "pending" || app.status === "accepted")
    .reduce((total, appointment) => {
      return total + appointment.fee;
    }, 0);
  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div>
        <div className="mt-[40px] md:mt-[70px]">
          <h3 className="text-[#4B5563] mb-[20px] outfit-medium text-[19px]">
            My Appointments
          </h3>
          <hr className="bg-[#7C7C7C] h-[2px] mb-[20px]" />
          <div>
            <p>Total Fees paid: ${paidFees}</p>
            <p>Total Fees yet to be paid : ${ToBePaidFee}</p>
          </div>
          <div className="mt-[40px] flex flex-col gap-y-[20px]">
            {appointmentArray.map((app) => (
              <div
                key={app._id}
                className="flex md:flex-row flex-col md:justify-between gap-y-[20px]"
              >
                <div className="flex gap-[20px]">
                  <Avatar size={210} src={app.doctorPic} shape="square" />
                  <div>
                    <h3 className="outfit-medium text-[18px]">
                      Dr. {app.doctorName}
                    </h3>
                    <p className="outfit-small text-[17px]">
                      {app.appointementTerm}
                    </p>
                    <span className="outfit-medium text-[14px]  block">
                      Appointment Type :{" "}
                      <span className="outfit-small text-[17px]">
                        {app.appointementService}
                      </span>
                    </span>
                    <div className="flex md:flex-row flex-col gap-[6px] md:gap-[20px]">
                      <span className="outfit-medium text-[14px]">
                        Status :{" "}
                        <span className="outfit-small text-[14px]">
                          {app.status}
                        </span>
                      </span>
                      <span className="outfit-medium text-[14px]">
                        Fee :{" "}
                        <span className="outfit-small text-[14px]">
                          {app.fee}
                        </span>
                      </span>
                    </div>
                    <span className="outfit-medium text-[14px]">
                      Appointment Address :{" "}
                    </span>
                    <span className="outfit-small text-[14px]">
                      54709 Willams Road
                      <br /> Station Suite 350, Enugu, Nigeria
                    </span>
                    <span className="outfit-medium text-[14px] block">
                      Date & Time :{" "}
                      <span className="outfit-small">
                        {app.appointmentDate} | {app.appointmentTime}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-[3px] justify-center items-center">
                  <button className="w-[150px] h-[45px] rounded-[10px] flex justify-center items-center text-[17px] border bg-bg-light">
                    Pay here
                  </button>
                  {app.status !== "Done" && (
                    <button
                      onClick={() => handleCancelAppointment(app._id)}
                      className="w-[150px] h-[45px] rounded-[10px] bg-red-900 flex justify-center items-center text-[17px] text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                <hr className="bg-[#7C7C7C] h-[2px] mt-[10px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

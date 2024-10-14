import { useParams } from "react-router-dom";
import { useGetdoctorQuery } from "../../Redux/features/Patients/PatientApi";
import { Avatar } from "antd";
import { MdVerified } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { useState } from "react";
import BookingModal from "./BookingModal";

const BookAppointmentPage = () => {
  const { _id } = useParams();
  const [isBooking, setIsBooking] = useState(false);
  const {
    data: docDetails,
    isLoading: isLoadingDoc,
    isFetching,
    isError,
    error,
  } = useGetdoctorQuery(_id);

  if (isLoadingDoc || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div className="error-message">
        <p>Failed to fetch doctor details.</p>
        <p>Error: {error?.message || "Something went wrong."}</p>
      </div>
    );
  }
  const detail = docDetails.doctor;

  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-[15px] items-center">
          <div className="w-[266px] h-[376px]">
            <Avatar
              src={detail.doctorPic}
              shape="square"
              className="w-full h-full"
            />
          </div>
          <div className="border p-[10px] md:p-[20px] w-full md:[60%] h-fit bg-white rounded-[20px]">
            <h3 className="outfit-bold text-[23px] md:text-[27px] text-[#1F2937] flex gap-[10px] items-center">
              Dr. {detail.fullname}{" "}
              {detail.yearsInService >= 2 && (
                <MdVerified className="text-[#70cca1]" size={25} />
              )}
            </h3>
            <span className="flex gap-[10px]">
              Email :
              <a
                className="text-[#20428561] text-wrap"
                href={`mailto:${detail.email}`}
              >
                {detail.email}
              </a>
            </span>
            <p
              className={`text-[15px] outfit-small ${
                detail.status === "Available"
                  ? "text-green-500 "
                  : "text-red-800"
              }`}
            >
              {detail.status}
            </p>
            <div className="flex gap-[10px] mt-[20px] items-center">
              <p className="text-[#4B5563] outfit-medium text-[20px]">
                {detail.qualification}
              </p>
              <span className="border border-[#4B5563] w-[80px] h-[44px] rounded-[20px] flex justify-center items-center text-[#4B5563] text-[16px]">
                {detail.yearsInService} years
              </span>
            </div>
            <div className="mt-[20px]">
              <p className="text-center md:text-start text-[#4B5563] text-[26px] mt-[7px]">
                Specialties
              </p>
              <p className="flex flex-col gap-y-[2px]">
                {detail.specialty.map((spec) => {
                  return (
                    <span key={spec} className="text-[13px] outfit-small">
                      {spec}
                    </span>
                  );
                })}
                <span className="text-[#1F2937] text-[20px] flex items-center gap-[10px]">
                  About <FiInfo size={23} />
                </span>
                <p className="mt-[10px] w-full text-[16px] outfit-small md:w-[80%]">
                  {detail.des ? detail.des : "Coming soon"}
                </p>
              </p>
            </div>
            <h3 className="outfit-medium text-[18px] text-center md:text-start my-[8px] underline">
              Appointment Fees
            </h3>
            <div className="md:flex gap-[35px]">
              {detail.service_fees.map((sf, index) => (
                <div key={index} className="my-[6px] md:w-fit ">
                  <p className="text-[23px] outfit-medium mb-[9px]">
                    {sf.term}
                  </p>
                  <span className="block text-[14px] outfit-small">
                    Consultation: ${sf.fees.consulting}
                  </span>
                  <span className="block text-[14px] outfit-small">
                    Medical Treatment: ${sf.fees.treatment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* booking appointment section */}
        <div className="mt-[20px]">
          <button
            disabled={detail.status !== "Available"}
            onClick={() => setIsBooking(true)}
            className="bg-bg-banner p-[7px] w-fit h-[44px] text-white flex justify-center items-center text-[18px] rounded-[10px]"
          >
            {detail.status !== "Available"
              ? "Cant be Booked"
              : " Start Appointment"}
          </button>
          <BookingModal
            isBooking={isBooking}
            setIsBooking={setIsBooking}
            doc={docDetails.doctor}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;

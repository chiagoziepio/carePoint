import { useState, useEffect } from "react";
import { Avatar, Select } from "antd";
import { useGetAllDoctorsQuery } from "../../Redux/features/Admin/AdminApi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AllDoctors = () => {
  const fields = [
    "All",
    "Dermatology",
    "Gastroenterology",
    "Gynecology",
    "Neurology",
    "Pediatricians",
    "General_Physician",
  ];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const specialityQuery = queryParams.get("speciality");

  const [selectedValue, setSelectedValue] = useState(specialityQuery || "All");

  const { data: alldoctors } = useGetAllDoctorsQuery();
  const user = useSelector((state) => state.AppReducer.user);
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const selected = alldoctors?.doctors.filter((doc) =>
    selectedValue === "All" ? true : doc.specialty.includes(selectedValue)
  );

  useEffect(() => {
    if (specialityQuery) {
      setSelectedValue(specialityQuery);
    }
  }, [specialityQuery]);

  return (
    <div className="h-full flex-grow res p-[10px]">
      <div className="">
        <h3 className="outfit-medium text-[22px] mb-[20px] text-[#4B5563]">
          Browse through our list of doctors
        </h3>
        <div className="mb-[40px] custom-select block md:hidden">
          <Select
            className="w-full h-[46px]"
            onChange={handleChange}
            value={selectedValue}
          >
            {fields.map((field, index) => (
              <Select.Option key={index} value={field}>
                {field}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className=" md:flex md:gap-x-[25px]">
          <div className="bg-white h-fit w-fit rounded-[12px] p-[10px] hidden md:block">
            {fields.map((field, index) => (
              <div
                key={index}
                className={`w-[263px] h-[47px] cursor-pointer pl-[10px] hover:bg-bg-light rounded-[7px] my-[7px] text-[#4B5563] outfit-medium border border-[#B4B4B4] ${
                  selectedValue === field && "bg-bg-light"
                }`}
                onClick={() => setSelectedValue(field)}
              >
                {field}
              </div>
            ))}
          </div>

          <div className="flex gap-[20px] flex-wrap justify-center">
            {selected
              ?.filter((doc) => doc._id !== user?._id)
              .map((doc) => (
                <div key={doc._id} className="bg-white w-[210px] h-fit">
                  <div className="bg-bg-doc w-full h-[190px]">
                    <Avatar
                      src={doc?.doctorPic}
                      shape="square"
                      alt={doc?.fullname}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-[7px]">
                    <div className="flex flex-x-[15px] items-center">
                      <span className="w-[10px] h-[10px] rounded-[50%] bg-green-500" />
                      <span className="text-green-500 text-[14px]">
                        {doc.status}
                      </span>
                    </div>
                    <h4 className="outfit-medium text-[20px]">
                      Dr. {doc?.fullname}
                    </h4>
                    <p className="flex flex-col gap-y-[2px]">
                      {doc?.specialty.map((spec) => {
                        return <span key={spec}>{spec}</span>;
                      })}
                    </p>
                    <Link to={`/bookappointment/${doc._id}`}>
                      <button className="w-full h-[44px] bg-bg-banner text-white text-[19px] flex justify-center items-center mt-[8px] rounded-[7px]">
                        Book Appointment
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;

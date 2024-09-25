import React, { useState } from "react";
import { doctorsOfTheWeek } from "./HomeComponents/DoctorsOfTheWeek";
import { Form, Select } from "antd";

const AllDoctors = () => {
  const fields = [
    "All",
    "Dermatologist",
    "Gastroenterologist",
    "Gynecologist",
    "Neurologist",
    "Pediatricians",
    "General_Physician",
  ];

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const selected = doctorsOfTheWeek.filter(
    (doc) => doc.field === selectedValue
  );

  return (
    <div className="h-full flex-grow res p-[10px]">
      <div className="">
        <h3 className="outfit-medium text-[22px] mb-[20px] text-[#4B5563]">
          Browse through our list of doctor
        </h3>
        <div className="mb-[40px] custom-select block md:hidden">
          <Select className="w-full h-[46px] " onChange={handleChange}>
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
                className={` w-[263px] h-[47px] cursor-pointer pl-[10px] hover:bg-bg-light rounded-[7px] my-[7px] text-[#4B5563] outfit-medium border border-[#B4B4B4] ${
                  selectedValue === field && "bg-bg-light"
                }`}
                onClick={() => setSelectedValue(field)}
              >
                {field}
              </div>
            ))}
          </div>
          {!selectedValue || selectedValue === "All" ? (
            <div className="flex gap-[20px] flex-wrap justify-center">
              {doctorsOfTheWeek.map((doc) => (
                <div key={doc.id} className="bg-white w-[210px] h-[270px]">
                  <div className="bg-bg-doc w-full h-[190px]">
                    <img
                      src={doc.img}
                      alt={doc.label}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-[7px]">
                    <div className="flex flex-x-[15px] items-center">
                      <span className="w-[10px] h-[10px] rounded-[50%] bg-green-500" />
                      <span className="text-green-500 text-[14px]">
                        Avaliable
                      </span>
                    </div>
                    <h4 className="outfit-medium text-[20px]">{doc.label}</h4>
                    <p>{doc.field}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            selected.map((doc) => (
              <div key={doc.id} className="bg-white w-[210px] h-[270px]">
                <div className="bg-bg-doc w-full h-[190px]">
                  <img
                    src={doc.img}
                    alt={doc.label}
                    className="h-full w-full"
                  />
                </div>
                <div className="p-[7px]">
                  <div className="flex flex-x-[15px] items-center">
                    <span className="w-[10px] h-[10px] rounded-[50%] bg-green-500" />
                    <span className="text-green-500 text-[14px]">
                      Avaliable
                    </span>
                  </div>
                  <h4 className="outfit-medium text-[20px]">{doc.label}</h4>
                  <p>{doc.field}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;

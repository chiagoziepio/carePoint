import { Avatar } from "antd";
import React from "react";

const speciality = [
  {
    id: 1,
    img: "/assests/Dermatologist.svg",
    label: "Dermatologist",
  },
  {
    id: 2,
    img: "/assests/Gastroenterologist.svg",
    label: "Gastroenterologist",
  },
  {
    id: 3,
    img: "/assests/Gynecologist.svg",
    label: "Gynecologist",
  },
  {
    id: 4,
    img: "/assests/General_physician.svg",
    label: "General_physician",
  },
  {
    id: 5,
    img: "/assests/Neurologist.svg",
    label: "Neurologist",
  },
  {
    id: 6,
    img: "/assests/Pediatricians.svg",
    label: "Pediatricians",
  },
];

const SpecialityIcon = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col items-center">
          <h3 className="outfit-medium text-[27px] leading-[20px] text-center ">
            Find by Speciality
          </h3>
          <p className="text-[18px] md:w-[500px] text-center my-[10px]">
            Simply browse our list of tranied and skilled doctors to book an
            appointment hassle-free
          </p>
        </div>
        <div className="flex gap-[15px] flex-wrap justify-center mt-[50px]">
        {speciality.map(sp =>(
            <div key={sp.id} className="flex items-center flex-col gap-y-[15px] cursor-pointer">
                <Avatar size={60} src= {sp.img}/>
                <p>{sp.label}</p>
            </div>
        ))}
        </div>
        
      </div>
    </div>
  );
};

export default SpecialityIcon;

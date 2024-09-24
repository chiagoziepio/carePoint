import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import SpecialityIcon from "./HomeComponents/SpecialityIcon";
import DoctorsOfTheWeek from "./HomeComponents/DoctorsOfTheWeek";

const Home = () => {
  return (
    <div className="h-full flex-grow pr-[20px]">
      <div className="mt-[80px] ml-[100px] mr-[40px]">
        <div className="bg-bg-banner md:w-full h-[557px] rounded-[12px] flex justify-between">
          <div className=" w-[50%] flex flex-col items-center justify-center pl-[10%]">
            <h3 className="leading-[50px] outfit-bold text-[40px] text-[white]">
              CarePoint saddled with the responsibilty of ensuring your wellness
            </h3>
            <div className="w-full mt-[30px] flex gap-x-[15px] items-center">
              <div className="w-[25%] cursor-pointer">
                <img src="/assests/testimonals.svg" alt="" />
              </div>
              <p className="text-white ">
                Satifised patient singing our praise <br />
                Simply browse through our list of qualifed doctors and book an
                appointment
              </p>
            </div>
            <div className="w-full mt-[20px]">
              <button className="w-[260px] group h-[63px] rounded-[40px] bg-white flex gap-x-[10px] items-center justify-center">
                Book appoinntment{" "}
                <span>
                  <MdArrowRightAlt
                    size={20}
                    className="group-hover:translate-x-[10px]"
                  />
                </span>
              </button>
            </div>
          </div>
          <div className="h-full">
            <img src="/assests/banner.svg" alt="" className="h-full" />
          </div>
        </div>
        <div className="mt-[30px] ">
          <SpecialityIcon />
          <DoctorsOfTheWeek/>
        </div>
      </div>
    </div>
  );
};

export default Home;

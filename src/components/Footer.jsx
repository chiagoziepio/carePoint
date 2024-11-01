import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-[80px] md:ml-[100px]  ">
      <div className="flex flex-wrap gap-y-[30px] md:flex-nowrap items-center w-full p-[20px] relative before:content-[''] before:absolute before:bottom-[-20px] before:left-0 before:w-[70%] before:ml-[20%] before:h-[2px] before:bg-[#7C7C7C]">
        <div className=" flex flex-col justify-start min-w-[300px] max-w-[350px  md:w-[40%] md:mr-[100px] ">
          <div className="flex gap-x-[10px] mb-[50px] items-center">
            <img src="/assests/logo.svg" alt="" />
            <p className="outfit-bold text-[20px]">CarePoint</p>
          </div>
          <p className="md:outfit-medium md:text-[18px] text-[16px] outifit.small">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur molestias ipsa labore quaerat, fugiat, doloremque
            nesciunt exercitationem culpa fugit, nobis eum perspiciatis
            inventore. Ab excepturi saepe impedit, fugit possimus architecto?
          </p>
        </div>
        <div className="flex md:justify-center md:min-w-[350px] md:max-w-[40%] w-full">
          <div className="flex md:justify-evenly w-full flex-wrap gap-y-[15px] md:flex-nowrap ">
            <div className="flex flex-col w-full md-w-fit">
              <h4 className="outfit-medium text-[18px] mb-[50px]">COMPANY</h4>
              <Link to={"/"} className="text-[18px] outfit-small">Home</Link>
              <Link className="text-[18px] outfit-small">About Us</Link>
              <Link className="text-[18px] outfit-small">Contact</Link>
            </div>
            <div className="flex flex-col w-full md-w-fit">
              <h4 className="outfit-medium text-[18px] mb-[50px]">
                GET IN TOUCH
              </h4>
              <a className="text-[18px] outfit-small" href="tel:+2349043120586">
                +2349043120586
              </a>
              <a
                className="text-[18px] outfit-small"
                href="mailto:paddypiochi@gmail.com"
              >
                paddypiochi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit p-[10px] flex justify-center mt-[40px]">
        <div>
          <p className="outfit-small text-[18px]">
            Copyright &copy; Paddy 2024{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

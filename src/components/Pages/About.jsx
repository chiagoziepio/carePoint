import React from "react";

const About = () => {
  return (
    <div className="h-full flex-grow res p-[10px]">
      <div>
        <h3 className="outfit-medium text-[24px] md:text-[30px] text-center">
          About CarePoint
        </h3>
        <div className="flex flex-col gap-y-[20px] md:flex-row gap-x-[3px] w-full">
          <div className="md:w-[30%] md:h-[300px]">
            <img src="/assests/about_image.svg" alt="" className="w-full h-full" />
          </div>
          <div className="text-[18px] md:w-[60%]">
            <p>
              Welcome to CarePoint, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.{" "}
              <br /> <br />
              CarePoint is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>{" "}
            <br />
            <div>
              <span className="outfit-bold">Our Vision</span>
              <p>
                Our vision at Prescripto is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

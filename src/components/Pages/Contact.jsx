import React from "react";

const Contact = () => {
  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div>
        <h3 className="outfit-medium text-[24px] md:text-[30px] text-center">
          Our Contact
        </h3>
        <div className="flex flex-col gap-y-[20px] md:flex-row gap-x-[3px] w-full">
          <div className="md:w-[30%] md:h-[300px]">
            <img
              src="/assests/contact_image.svg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="text-[18px] md:w-[60%] md:h-[300px] md:py-[10px]">
            <div>
              <h3 className="outfit-bold">Our OFFICE</h3>
              <address className="text-[18px] outfit-small">
                <p>
                  54709 Willams Road
                  <br /> Station Suite 350, Enugu, Nigeria
                </p>
                <br />
                <a href="mailto:paddypiochi@gmail.com">
                  Email: paddypiochi@gmail.com
                </a>
                <br />
                <a href="tel:+2349043120586">Tel: +2349043120586</a>
              </address>
            </div>
            <div className="mt-[15px]">
              <h5>Careers at CarePoint</h5>
              <p className="text-[15px] outfit-small my-[7px]">
                Learn more about our teams and job openings.
              </p>
              <button className="border bg-white flex justify-center items-center w-[120px] h-[50px] text-[15px]">
                Explore jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

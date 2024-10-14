import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DoctorsOfTheWeek = () => {
  const doctorsOfTheWeek = useSelector((state) => state.AdminReducer.doctors);
  const user = useSelector((state) => state.AppReducer.user);
  return (
    <div className="mt-[70px]">
      <div>
        <div className="flex flex-col items-center gap-y-[20px]">
          <h3 className="outfit-medium md:text-[40px] text-[30px] md:leading-[30px]">
            Doctors Of The Week
          </h3>
          <p className="text-[17px] outifit-medium">Based on patients poll</p>
        </div>
        {doctorsOfTheWeek.length && (
          <div className="flex gap-[20px] flex-wrap justify-center">
            {doctorsOfTheWeek
              .filter((doc) => doc._id !== user?._id)
              .slice(0, 6)
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
        )}
        <div className=" bg-bg-banner mt-[150px] h-fit flex justify-evenly rounded-[12px]">
          <div className="flex justify-between h-fit flex-wrap md:flex-nowrap  ">
            <div className="flex flex-col justify-center items-center mt-[5%] w-full md:w-[50%]">
              <h3 className="outfit-bold md:text-[3rem] text-[20px] md:leading-[90px] text-white">
                Book Appointment <br /> with Over 100+ Doctors
              </h3>
              <div className="w-full flex justify-center md:justify-start">
                <button className="w-fit hover:rounded-none transition-rounded ease-in duration-700 h-fit p-[10px] rounded-[40px] bg-white flex gap-x-[10px] items-center justify-center">
                  <Link to={"/register"}>create account</Link>
                </button>
              </div>
            </div>
            <div className="md:mt-[-90px]">
              <img src="/assests/appointment.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsOfTheWeek;

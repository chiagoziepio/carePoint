import { MdArrowRightAlt } from "react-icons/md";
import SpecialityIcon from "./HomeComponents/SpecialityIcon";
import DoctorsOfTheWeek from "./HomeComponents/DoctorsOfTheWeek";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div>
        <div className="bg-bg-banner w-full rounded-[12px] min-h-[639px] md:min-h-[519px] flex flex-col-reverse md:flex-row md:justify-center md:items-center justify-evenly">
          <div className="p-[10px] md:ml-[100px]">
            <h3 className="outfit-bold text-white text-[25px] md:text-[40px] md:leading-[50px]">
              {" "}
              CarePoint saddled with the responsibilty of ensuring your wellness
            </h3>
            <div className="hidden md:block mt-[30px]">
              <div className="flex gap-x-[20px] ">
                <img
                  src="/assests/testimonals.svg"
                  alt=""
                  className="cursor-pointer"
                />
                <p className="text-white">
                  Thousands of Users sing our praise <br />
                  Browse through our list of qualified doctors to book an
                  appoint
                </p>
              </div>
            </div>
            <Link to="/doctors">
              <button className="group mt-[30px] bg-white h-fit md:h-[64px] md:w-[213px] justify-center items-center p-[5px] w-fit flex gap-x-[10px] rounded-[10px] md:rounded-[30px] cursor-pointer">
                Book Appointment{" "}
                <MdArrowRightAlt className=" group-hover:translate-x-[10px] transition-transform duration-500" />
              </button>
            </Link>
          </div>
          <div className="">
            <img className="" src="/assests/banner.svg" alt="" />
          </div>
        </div>
        <div className="mt-[60px]">
          <SpecialityIcon />
          <DoctorsOfTheWeek />
        </div>
      </div>
    </div>
  );
};

export default Home;

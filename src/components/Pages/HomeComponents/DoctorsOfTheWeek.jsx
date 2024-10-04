import { Link } from "react-router-dom";

export const doctorsOfTheWeek = [
  {
    id: 1,
    img: "/assests/doctors/img1.png",
    label: "Dr. Patrick",
    field: "Gastroelogist",
  },
  {
    id: 2,
    img: "/assests/doctors/img2.png",
    label: "Dr. Timonthy",
    field: "General_Physician",
  },
  {
    id: 3,
    img: "/assests/doctors/img3.png",
    label: "Dr. John",
    field: "Neurologist",
  },
  {
    id: 4,
    img: "/assests/doctors/img4.png",
    label: "Dr. Kenndy",
    field: "Neurologist",
  },
  {
    id: 5,
    img: "/assests/doctors/img5.png",
    label: "Dr. Bush",
    field: "Pediatricians",
  },
  {
    id: 6,
    img: "/assests/doctors/img6.png",
    label: "Dr. Kelvin",
    field: "Dermatologist",
  },
  {
    id: 7,
    img: "/assests/doctors/img7.png",
    label: "Dr. Kelvin",
    field: "Dermatologist",
  },
];
const DoctorsOfTheWeek = () => {
  return (
    <div className="mt-[70px]">
      <div>
        <div className="flex flex-col items-center gap-y-[20px]">
          <h3 className="outfit-medium md:text-[40px] text-[30px] md:leading-[30px]">
            Doctors Of The Week
          </h3>
          <p className="text-[17px] outifit-medium">Based on patients poll</p>
        </div>
        <div className="flex gap-[20px] flex-wrap justify-center">
          {doctorsOfTheWeek.map((doc) => (
            <div key={doc.id} className="bg-white w-[210px] h-[270px]">
              <div className="bg-bg-doc w-full h-[190px]">
                <img src={doc.img} alt={doc.label} className="h-full w-full" />
              </div>
              <div className="p-[7px]">
                <div className="flex flex-x-[15px] items-center">
                  <span className="w-[10px] h-[10px] rounded-[50%] bg-green-500" />
                  <span className="text-green-500 text-[14px]">Avaliable</span>
                </div>
                <h4 className="outfit-medium text-[20px]">{doc.label}</h4>
                <p>{doc.field}</p>
              </div>
            </div>
          ))}
        </div>
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

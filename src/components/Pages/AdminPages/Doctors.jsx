import PropTypes from "prop-types";
import { useGetAllDoctorsQuery } from "../../../Redux/features/Admin/AdminApi";
import { Avatar, Switch } from "antd";
import TableList from "../../TableList";
const Doctors = ({ setDocCount, appointment }) => {
  const { data: doctor, isLoading } = useGetAllDoctorsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const doctorData = doctor?.doctors;
  const DocArray = Array.isArray(doctorData)
    ? [...doctorData].reverse()
    : doctorData
    ? [...doctorData].reverse()
    : [];
  setDocCount(DocArray.length);
  //console.log(DocArray);

  const dataSource = DocArray.map((doctor) => ({
    key: doctor._id,
    email: doctor.email,
    phone: doctor.phone,
    address: doctor.address,
    status: doctor.status,
    appointmentCount: appointment.filter((app) => app.doctorId === doctor._id)
      .length,
    specialty: doctor?.specialty,
    name_image: { image: doctor.doctorPic, name: doctor.fullname },
    experience: doctor.yearsInService,
    registrantionDate: doctor.registerAt,
    qualification: doctor.qualification,
  }));
  const columns = [
    {
      title: "Name",
      dataIndex: "name_image",
      key: "name_image",
      render: (name_image) => (
        <div className="flex flex-col gap-[10px]">
          <Avatar src={name_image.image} />
          <span className="outfit-small text-[14px]">{name_image.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <span className="outfit-small text-[14px]">{email}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <span className="outfit-small text-[14px]">{phone}</span>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <span className="outfit-small text-[14px] text-wrap">
          {address ? address : "N/A"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "Available" ? "text-green-950" : "text-red-950"
          } outfit-small text-[14px] `}
        >
          {status}
        </span>
      ),
    },
    {
      title: "No. of Appointment",
      dataIndex: "appointmentCount",
      key: "appointmentCount",
      render: (appointmentCount) => (
        <span className="outfit-small text-[14px]">{appointmentCount}</span>
      ),
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
      render: (specialty) => {
        return Array.isArray(specialty) ? (
          <div className="flex flex-col outfit-small text-[14px]">
            {specialty.map((sp, index) => (
              <span key={index}>{sp}</span>
            ))}
          </div>
        ) : (
          <span>N/A</span>
        );
      },
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      render: (experience) => (
        <span className="outfit-small text-[14px]">{experience}</span>
      ),
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
      render: (qualification) => (
        <span className="outfit-small text-[14px] capitalize">
          {qualification}
        </span>
      ),
    },
    {
      title: "Registrantion Date",
      dataIndex: "registrantionDate",
      key: "registrantionDate",
      render: (registrantionDate) => (
        <span className="outfit-small text-[14px]">
          {new Date(registrantionDate).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        return (
          <div>
            <Switch checked={status === "Available"} />
          </div>
        );
      },
    },
  ];
  return (
    <TableList
      dataSource={dataSource}
      columns={columns}
      title={"All Doctors"}
    />
  );
};
Doctors.PropTypes = {
  setDocCount: PropTypes.func,
  appointment: PropTypes.array,
};
export default Doctors;

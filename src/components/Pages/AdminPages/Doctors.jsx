import PropTypes from "prop-types";
import { useGetAllDoctorsQuery } from "../../../Redux/features/Admin/AdminApi";
import { Avatar, message, Modal, Switch } from "antd";
import TableList from "../../TableList";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import {
  useDeactivateDoctorMutation,
  useActivateDoctorMutation,
} from "../../../Redux/features/Admin/AdminApi";

const Doctors = ({ setDocCount, appointment }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectDoc, setSelectDoc] = useState(null);
  const [newDocs, setNewDocs] = useState(null);
  const { data: doctor, isLoading } = useGetAllDoctorsQuery();
  const [deactivateDoctor] = useDeactivateDoctorMutation();
  const [activateDoctor] = useActivateDoctorMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDeactivateDoc = async () => {
    //console.log(selectDoc);
    const _id = selectDoc.key;

    try {
      const res =
        selectDoc.status === "Available"
          ? await deactivateDoctor({ _id }).unwrap()
          : await activateDoctor({ _id }).unwrap();
      const data = res;
      message.success(data.msg);
      setNewDocs(data.data);
    } catch (error) {
      message.error(error.data.msg);
    } finally {
      setIsModalShowing(false);
      setSelectDoc(null);
    }
  };
  const doctorData = newDocs ? newDocs : doctor?.doctors;
  const DocArray = Array.isArray(doctorData)
    ? [...doctorData].reverse()
    : doctorData
    ? [...doctorData].reverse()
    : [];
  setDocCount(DocArray.length);

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
            <Switch
              checked={status === "Available"}
              onClick={() => {
                setSelectDoc(record);
                setIsModalShowing(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {isModalShowing && (
        <Modal open={isModalShowing} footer={null} closable={false} width={400}>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="outfit-small text-[22px]">Action Warning</h3>
              <span
                onClick={() => setIsModalShowing(false)}
                className="w-fit h-fit cursor-pointer"
              >
                <MdClose size={22} />
              </span>
            </div>
            <div className="my-[15px]">
              <p className="outfit-medium text-[22px] text-wrap text-center">
                Are you sure you want to{" "}
                {selectDoc.status === "Available" ? "Deactivate" : "Activate"}{" "}
                this Doctor
              </p>
            </div>
            <div className="flex gap-[10px] justify-center">
              <button
                onClick={() => setIsModalShowing(false)}
                className="w-[120px] h-[44px] rounded-[7px] bg-bg-banner text-white text-[16px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateDoc}
                className={`${
                  selectDoc.status === "Available"
                    ? "bg-red-950"
                    : "bg-primary-bg-color"
                } w-[120px] h-[44px] rounded-[7px] text-white text-[16px] flex items-center justify-center`}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <TableList
        dataSource={dataSource}
        columns={columns}
        title={"All Doctors"}
      />
    </div>
  );
};
Doctors.propTypes = {
  setDocCount: PropTypes.func,
  appointment: PropTypes.array,
};
export default Doctors;

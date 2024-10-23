import { Avatar, message, Modal, Switch } from "antd";
import { useGetAllPatientsQuery } from "../../../Redux/features/Admin/AdminApi";
import TableList from "../../TableList";
import PropTypes from "prop-types";
import { useTogglePatientStatusMutation } from "../../../Redux/features/Admin/AdminApi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const Patients = ({ setPatCount, appointment }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectPat, setSelectedPat] = useState(null);
  const [newPats, setNewPats] = useState(null);
  const { data: patient, isLoading } = useGetAllPatientsQuery();
  const [togglePatientStatus] = useTogglePatientStatusMutation();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleTogglePatientStatus = async () => {
    const _id = selectPat.key;
    try {
      const res = await togglePatientStatus({ _id }).unwrap();
      const data = res;
      message.success(data.msg);
      setNewPats(data.data);
    } catch (error) {
      message.error(error.data.msg);
    } finally {
      setIsModalShowing(false);
      setSelectedPat(null);
    }
  };
  const patientData = newPats ? newPats : patient?.data;
  const patArray = Array.isArray(patientData)
    ? [...patientData]
    : patientData
    ? [...patientData]
    : [];
  setPatCount(patArray.length);

  const dataSource = patArray.map((patient) => ({
    key: patient._id,
    email: patient.email,
    phone: patient.phone,
    address: patient.address,
    status: patient.status,
    name_image: { image: patient.pic, name: patient.fullname },
    age: patient.age,
    gender: patient.gender,
    role: patient.role,
    appointmentCount: appointment.filter((app) => app.patientId === patient._id)
      .length,
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
        <span className="outfit-small text-[14px] text-wrap">{address}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="outfit-small text-[14px]">{status}</span>
      ),
    },
    {
      title: "No. of Appointments",
      dataIndex: "appointmentCount",
      key: "appointmentCount",
      render: (appointmentCount) => (
        <span className="outfit-small text-[14px]">{appointmentCount}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span className="outfit-small text-[14px] capitalize">{role}</span>
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
              checked={status === "Active"}
              onClick={() => {
                setSelectedPat(record);
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
                {selectPat.status === "Active" ? "Deactivate" : "Activate"} this
                Patient
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
                onClick={handleTogglePatientStatus}
                className={`${
                  selectPat.status === "Active"
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
        title="All Patients"
      />
    </div>
  );
};

Patients.propTypes = {
  setPatCount: PropTypes.func.isRequired,
  appointment: PropTypes.array.isRequired,
};
export default Patients;

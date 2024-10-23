import { Avatar, Switch } from "antd";
import { useGetAllPatientsQuery } from "../../../Redux/features/Admin/AdminApi";
import TableList from "../../TableList";

const Patients = ({ setPatCount }) => {
  const { data: patient, isLoading } = useGetAllPatientsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const patientData = patient?.data;
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
            <Switch checked={status === "Active"} />
          </div>
        );
      },
    },
  ];

  return (
    <TableList dataSource={dataSource} columns={columns} title="All Patients" />
  );
};

export default Patients;

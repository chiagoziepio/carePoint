import { Avatar, message, Modal } from "antd";
import { useAdminCancelAppointmentMutation } from "../../../Redux/features/Admin/AdminApi";
import { useState } from "react";
import TableList from "../../TableList";
import PropTypes from "prop-types";

const AdminDashboard = ({ appointment }) => {
  const [newApp, setNewApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [adminCancelAppointment] = useAdminCancelAppointmentMutation();
  const handleCancelAppointment = async (term, record) => {
    const appData = { term, _id: record.key };
    try {
      const res = await adminCancelAppointment(appData).unwrap();
      const data = res;
      message.success(data.msg);
      setNewApp(data.data);
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  const APPS = newApp ? newApp : appointment;

  const columns = [
    {
      title: "S/N",
      dataIndex: "sn",
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => (
        <div>
          <Avatar src={patient.img} />
          <p className="text-[14px]">{patient.name}</p>
        </div>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor) => (
        <div>
          <Avatar src={doctor.img} />
          <p className="text-[14px]">{doctor.name}</p>
        </div>
      ),
    },
    {
      title: "Term & Service",
      dataIndex: "term_service",
      key: "term_service",
      render: (term_service) => {
        return (
          <div className="flex flex-col gap-[7px]">
            <p className="text-[14px]">{term_service.term}</p>
            <p className="text-[14px]">{term_service.service}</p>
          </div>
        );
      },
    },
    {
      title: "Fee($)",
      dataIndex: "fee",
      key: "fee",
      render: (fee) => <span className="text-[14px]">{fee}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date_time",
      key: "date_time",
      render: (date_time) => {
        return (
          <div className="flex flex-col gap-[6px]">
            <span>{date_time.date}</span>
            <span>{date_time.time}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <div className="flex flex-col gap-[6px]">
            <span className={`${status === "rejected" && "text-red-950"}`}>
              {status}
            </span>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        switch (status) {
          case "Done":
            return <p>completed</p>;

          case "rejected":
            return (
              <div className="flex gap-[5px]">
                <button
                  onClick={() => {
                    setCurrentRecord(record);
                    setShowModal(true);
                  }}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-green-950"
                >
                  View
                </button>
                <button
                  onClick={() => handleCancelAppointment("delete", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-red-950"
                >
                  delete
                </button>
              </div>
            );

          default:
            return (
              <div className="flex gap-[5px]">
                <button
                  onClick={() => handleCancelAppointment("cancelled", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-red-950"
                >
                  Cancel
                </button>
              </div>
            );
        }
      },
    },
  ];

  const dataSource = APPS.map((app, index) => {
    const formattedDate = new Date(app.appointmentDate).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const formattedTime = new Date(
      `1970-01-01T${app.appointmentTime}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return {
      key: app._id,
      patient: { img: app.patientPic, name: app.patientName },
      doctor: { img: app.doctorPic, name: app.doctorName },
      term_service: {
        term: app.appointementTerm,
        service: app.appointementService,
      },
      rejection_reason: app.rejection_reason,
      fee: app.fee,
      date_time: { date: formattedDate, time: formattedTime },
      status: app.status,
      sn: index + 1,
    };
  });

  return (
    <div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={400}
      >
        <div>
          <h3 className="outfit-medium text-[24px]">Cancellation Reason</h3>
          {console.log(currentRecord)}
          <div className="my-[10px]">
            {currentRecord?.rejection_reason
              ? currentRecord.rejection_reason
              : "No reason Provided"}
          </div>
        </div>
      </Modal>
      <TableList
        dataSource={dataSource}
        columns={columns}
        title=" All Appointment"
      />
    </div>
  );
};

AdminDashboard.propTypes = {
  appointment: PropTypes.array.isRequired,
};
export default AdminDashboard;

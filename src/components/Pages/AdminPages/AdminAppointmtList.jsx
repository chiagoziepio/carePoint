import { Avatar, Table } from "antd";
import { useGetAllAppointmentsQuery } from "../../../Redux/features/Admin/AdminApi";
import { useState } from "react";

const AdminDashboard = ({ appointment }) => {
  const [newApp, setNewApp] = useState(null);

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
            <span>{status}</span>
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
          default:
            return (
              <div className="flex gap-[5px]">
                <button
                  //onClick={() => handleUpdateAppointment("accepted", record)}
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

      fee: app.fee,
      date_time: { date: formattedDate, time: formattedTime },
      status: app.status,
      sn: index + 1,
    };
  });

  return (
    <div>
      <div>
        <div className="bg-white rounded-[12px]">
          <Table
            scroll={{ x: "max-content" }}
            style={{
              overflowX: "auto",
            }}
            dataSource={dataSource}
            columns={columns}
            rowKey="key"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { Avatar, message, Modal } from "antd";
import { useUpdateAppointmentMutation } from "../../../Redux/features/Doctor/DoctorApi";
import { useState } from "react";
import TableList from "../../TableList";
export const DoctorsAppointments = ({ appointment }) => {
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [newApp, setNewApp] = useState(null);
  const handleUpdateAppointment = async (term, record) => {
    const appData = { term, _id: record.key };
    if (term === "reject") {
      Modal.confirm({
        title: "Confirmation",
        content: "Are you sure you want to reject this appointment?",
        onOk: async () => {
          try {
            const res = await updateAppointment(appData).unwrap();
            const data = res;
            const appointment = data.data;
            const appointments = Array.isArray(appointment)
              ? [...appointment].reverse()
              : appointment
              ? [...appointment].reverse()
              : [];
            setNewApp(appointments);
            message.success(data.msg);
          } catch (error) {
            message.error(error.data.msg);
          }
        },
      });
    }
    // try {
    //   const res = await updateAppointment(appData).unwrap();
    //   const data = res;
    //   const appointment = data.data;
    //   const appointments = Array.isArray(appointment)
    //     ? [...appointment].reverse()
    //     : appointment
    //     ? [...appointment].reverse()
    //     : [];
    //   setNewApp(appointments);
    //   message.success(data.msg);
    // } catch (error) {
    //   message.error(error.data.msg);
    // }
  };

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
          case "pending":
            return (
              <div className="flex gap-[5px]">
                <button
                  onClick={() => handleUpdateAppointment("reject", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-red-950"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateAppointment("accepted", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-bg-banner"
                >
                  Accept
                </button>
              </div>
            );
          case "accepted":
            return (
              <div className="flex gap-[5px]">
                <button
                  onClick={() => handleUpdateAppointment("cancelled", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-red-950"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateAppointment("Done", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-bg-banner"
                >
                  Done
                </button>
              </div>
            );
          case "cancelled":
            return (
              <div className="flex gap-[5px]">
                <button
                  onClick={() => handleUpdateAppointment("accepted", record)}
                  className="w-[70px] h-[30px] text-[12px] text-white bg-bg-banner"
                >
                  activate
                </button>
              </div>
            );
          default:
            return <p>completed</p>;
        }
      },
    },
  ];
  const theAPP = newApp ? newApp : appointment;
  const dataSource = theAPP.map((app, index) => {
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

  const recievedFee = theAPP
    ?.filter((app) => app.status === "Done")
    .reduce((total, appointment) => {
      return total + appointment.fee;
    }, 0);

  const pendingFee = theAPP
    .filter((app) => app.status === "pending" || app.status === "accepted")
    .reduce((total, appointment) => {
      return total + appointment.fee;
    }, 0);
  return (
    <div>
      <div>
        <div>
          <p>Income Earned : ${recievedFee}</p>
          <p>Incoming Earnings : ${pendingFee}</p>
        </div>
        <div className="bg-white rounded-[12px]">
          <TableList
            columns={columns}
            dataSource={dataSource}
            title={"All Appointment"}
          />
        </div>
      </div>
    </div>
  );
};
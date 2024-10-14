import { DatePicker, message, Modal, Select, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useBookAppointmentMutation } from "../../Redux/features/Patients/PatientApi";
import { trackUser } from "../../Redux/Api/AppSlice";

const BookingModal = ({ isBooking, doc, setIsBooking }) => {
  const [selectedTerm, setSelectedTerm] = useState();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [serviceFee, setServiceFees] = useState("");
  const [appointmentService, setAppointmentService] = useState("");
  const user = useSelector((state) => state.AppReducer.user);
  const dispatch = useDispatch();

  const [BookAppointment, { isLoading }] = useBookAppointmentMutation();

  const handleSelectTermChange = (value) => {
    setSelectedTerm(value);
  };

  const handleServiceChange = (value) => {
    setAppointmentService(value);

    if (value === "Consultation") {
      setServiceFees(selectedService?.consulting);
    } else if (value === "Medical Treatment") {
      setServiceFees(selectedService?.treatment);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? moment(date) : null);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };

  const disablePastDates = (current) => {
    return current && current <= moment().endOf("day");
  };

  useEffect(() => {
    const result = doc.service_fees.find((item) => item.term === selectedTerm);
    setSelectedService(result?.fees);
  }, [selectedTerm, doc.service_fees]);

  const resetBookingForm = () => {
    setSelectedTerm("");
    setSelectedDate("");
    setSelectedTime("");
    setAppointmentService(null);
    setServiceFees(null);
    setSelectedService(null);
  };

  const hanleSubmitAppointment = async () => {
    if (!user) return message.error("Not logged in");
    if (user.role === "doctor")
      return message.error("Can't Book Appointment as Doctor");
    if (
      !serviceFee ||
      !appointmentService ||
      !selectedTerm ||
      !selectedDate ||
      !selectedTime ||
      !doc._id
    )
      return message.error("fill all blank");
    const formattedDate = selectedDate.format("YYYY-MM-DD HH:mm:ss");

    const appointmentObj = {
      fee: serviceFee,
      appointementService: appointmentService,
      appointementTerm: selectedTerm,
      appointmentDate: formattedDate,
      appointmentTime: selectedTime,
      doctorId: doc._id,
      patientId: user?._id,
    };
    try {
      const res = await BookAppointment(appointmentObj).unwrap();
      const data = res;

      message.success(data.msg);
      dispatch(trackUser(data.user));
      resetBookingForm();
      setIsBooking(false);
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  return (
    <Modal width={500} footer={null} closable={false} open={isBooking}>
      <div>
        <div className="flex justify-between my-[10px]">
          <h3 className="outfit-medium text-[20px]">Appointment Form</h3>
          <span
            className="w-fit h-fit cursor-pointer"
            onClick={() => {
              setIsBooking(false);
              resetBookingForm();
            }}
          >
            <IoCloseOutline size={30} />
          </span>
        </div>

        {serviceFee && (
          <p className="my-[5px] text-[18px] outfit-small">
            Fee: ${serviceFee}{" "}
          </p>
        )}

        <Select
          className="w-full h-[44px] custom-select"
          value={selectedTerm}
          disabled={isLoading}
          onChange={handleSelectTermChange}
          placeholder="Choose a service"
        >
          {doc.specialty.map((spec, index) => (
            <Select.Option key={index} value={spec}>
              {spec}
            </Select.Option>
          ))}
        </Select>

        {selectedService && (
          <Select
            className="w-full h-[44px] custom-select mt-[15px]"
            disabled={isLoading}
            value={appointmentService}
            onChange={handleServiceChange}
            placeholder="Choose service type"
          >
            <Select.Option value="Consultation">Consultation</Select.Option>
            <Select.Option value="Medical Treatment">
              Medical Treatment
            </Select.Option>
          </Select>
        )}

        {selectedTerm && appointmentService && (
          <div className="flex flex-col gap-[7px] my-[10px]">
            <DatePicker
              onChange={handleDateChange}
              disabled={isLoading}
              disabledDate={disablePastDates}
              className="w-full h-[44px]"
            />
            {selectedDate && (
              <TimePicker
                onChange={handleTimeChange}
                disabled={isLoading}
                className="w-full h-[44px]"
              />
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-[12px] justify-center mt-[15px]">
          <button
            onClick={() => {
              setIsBooking(false);
              resetBookingForm();
            }}
            disabled={isLoading}
            className="w-[150px] h-[45px] bg-transparent border border-[#4B5563] flex justify-center items-center text-black text-[17px] rounded-[13px]"
          >
            Cancel
          </button>
          <button
            onClick={hanleSubmitAppointment}
            disabled={isLoading}
            className="w-[150px] h-[45px] bg-bg-banner border-none flex justify-center items-center text-white text-[17px] rounded-[13px]"
          >
            Book
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;

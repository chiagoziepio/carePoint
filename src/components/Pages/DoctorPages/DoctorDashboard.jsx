import { Alert, Avatar, Button, Form, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DoctorsAppointments } from "./DoctorsAppointments";
import {
  useGetDocAppointmentQuery,
  useUpdateDocDetailsMutation,
  useUpdateDoctorPicMutation,
} from "../../../Redux/features/Doctor/DoctorApi";
import { trackUser } from "../../../Redux/Api/AppSlice";

const DoctorDashboard = () => {
  const [tab, setTab] = useState("tab1");
  const [isEditing, setIsEditing] = useState(false);
  const { TextArea } = Input;
  const doctor = useSelector((state) => state.DoctorReducer.doctor);
  const user = useSelector((state) => state.AppReducer.user);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(doctor ? doctor?.doctorPic : null);
  const [updateDoctorPic, { isLoading: isChangingPic }] =
    useUpdateDoctorPicMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!doctor || !user || user.role !== "doctor") {
      return navigate(-1);
    }
  }, []);
  const [form] = Form.useForm();
  const { data: appointmentData } = useGetDocAppointmentQuery(doctor._id);
  const [updatedocdetail, { isLoading }] = useUpdateDocDetailsMutation();
  const theApp = appointmentData?.data;
  const appointment = Array.isArray(theApp)
    ? [...theApp].reverse()
    : theApp
    ? [...theApp].reverse()
    : [];

  const handleChange = (e) => {
    const regex = /^[0-9+\-()]*$/;
    const value = e.target.value;

    if (regex.test(value)) {
      e.target.value = value;
    } else {
      e.target.value = value.replace(/[^0-9+\-()]/g, "");
    }
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    return false;
  };

  const changeDocPic = async () => {
    try {
      if (fileList.length < 0) {
        return message.error("attach a photo");
      }
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
      const res = await updateDoctorPic(formData).unwrap();
      const data = res;
      dispatch(trackUser(data.user));
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
      console.log(error);
      setImageUrl(doctor ? doctor?.doctorPic : null);
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    changeDocPic();
  };

  const onFinnish = async (values) => {
    try {
      const res = await updatedocdetail(values).unwrap();
      const data = res;
      dispatch(trackUser(data.user));
      message.success(data.msg);
      setIsEditing(false);
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        des: doctor.des,
      });
    }
  }, [doctor, form]);
  return (
    <div className="flex-grow h-full p-[10px]">
      <div>
        <div className="flex flex-wrap w-full gap-[25px] mt-[30px]">
          <div
            onClick={() => setTab("tab1")}
            className={`${
              tab === "tab1"
                ? "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-none flex gap-[15px] items-center cursor-pointer"
                : "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-md flex gap-[15px] items-center cursor-pointer"
            } `}
          >
            <Avatar src="/assests/doctor_icon.svg" size={60} />
            <h3 className="outfit-medium text-[20px] my-[6px] ml-[10px] text-[#3c3b3bab]">
              Profile
            </h3>
          </div>
          <div
            onClick={() => setTab("tab2")}
            className={`${
              tab === "tab2"
                ? "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-none flex gap-[15px] items-center cursor-pointer"
                : "bg-white w-[244px] h-[116px] rounded-[7px] p-[5px] shadow-md flex gap-[15px] items-center cursor-pointer"
            } `}
          >
            <Avatar
              shape="sqaure"
              src="/assests/appointments_icon.svg"
              size={60}
            />
            <div>
              <span>{appointment.length}</span>
              <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                {appointment.length > 1 ? "Appointments" : "Appointment"}
              </h3>
            </div>
          </div>
        </div>
        <hr className="h-[2px] my-[20px] bg-[#3c3b3bab]" />
        <div>
          {!doctor?.des && (
            <Alert
              message="Warning!"
              description="Add description to your profile to help patient get to know you Better"
              type="warning"
              showIcon
              style={{ maxWidth: "500px" }}
            />
          )}
          {tab === "tab1" && (
            <div className="mt-[40px]">
              <div className="flex gap-[20px] flex-wrap">
                <div className="flex flex-col gap-[10px]">
                  <Avatar src={imageUrl} size={170} shape="square" />
                  {!doctor?.doctorPic ||
                    (imageUrl && (
                      <Upload
                        showUploadList={false}
                        beforeUpload={handleUpload}
                        onChange={onChange}
                        disabled={isChangingPic || doctor?.doctorPic}
                        accept=".png,.jpg,.jpeg"
                      >
                        <p className="text-[18px] outfit-small cursor-pointer underline">
                          Upload Picture
                        </p>
                      </Upload>
                    ))}
                </div>
                <div>
                  <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                    <span className="text-[black] outfit-small">Name: </span>
                    Dr. {doctor?.fullname}
                  </h3>
                  <div>
                    <h3 className="text-[22px]">
                      {doctor?.specialty.length > 1
                        ? "Specialties"
                        : "Specialty"}
                    </h3>
                    {doctor?.specialty.map((sp) => (
                      <p className="outfit-small text-[15px]" key={sp}>
                        {sp}
                      </p>
                    ))}
                  </div>
                  <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab] capitalize">
                    <span className="text-[black] outfit-small">
                      Qualification:{" "}
                    </span>
                    {doctor?.qualification}
                  </h3>
                  <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab] capitalize">
                    <span className="text-[black] outfit-small">
                      Experince:{" "}
                    </span>
                    {doctor?.yearsInService} year(s)
                  </h3>
                </div>
              </div>
              <hr className="h-[2px] my-[20px] bg-[#3c3b3bab]" />
              <div>
                <div
                  className={`${
                    !isEditing && "flex gap-[15px] items-center flex-wrap"
                  } "gap-[15px] items-center flex-wrap"`}
                >
                  <h4 className="outfit-medium text-[20px]">
                    Basic Informations
                  </h4>
                  <Form form={form} layout="vertical" onFinish={onFinnish}>
                    <div className=" flex gap-[15px] flex-wrap">
                      <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                        disabled={isLoading}
                        className="text-[15px] outline-none cursor-pointer border border-[#70cca1] w-[127px] h-[37px] md:h-[50px] rounded-[47px] flex justify-center items-center"
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                      {isEditing && (
                        <Button
                          htmlType="submit"
                          disabled={isLoading}
                          className="text-[15px] outline-none cursor-pointer border border-[#70cca1] !bg-transparent h-[37px] md:h-[50px] w-[207px] rounded-[47px] flex justify-center items-center"
                        >
                          Save Information
                        </Button>
                      )}
                    </div>
                    {isEditing && (
                      <div className="max-w-[400px] mt-[20px]">
                        <Form.Item name={"email"} label="Email">
                          <Input type="email" disabled={isLoading} />
                        </Form.Item>
                        <Form.Item name={"phone"} label="Phone Number">
                          <Input disabled={isLoading} onInput={handleChange} />
                        </Form.Item>
                        <Form.Item name={"address"} label="Address">
                          <Input disabled={isLoading} />
                        </Form.Item>
                        <Form.Item name={"des"} label="Description">
                          <TextArea autoSize disabled={isLoading} />
                        </Form.Item>
                      </div>
                    )}
                  </Form>
                </div>
                <div>
                  {!isEditing && (
                    <div>
                      <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab] capitalize">
                        <span className="text-[black] outfit-small">
                          Phone Number:{" "}
                        </span>
                        {doctor?.phone}
                      </h3>
                      <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                        <span className="text-[black] outfit-small">
                          Email:{" "}
                        </span>
                        {doctor?.email}
                      </h3>
                      <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                        <span className="text-[black] outfit-small">
                          Address:{" "}
                        </span>
                        {doctor?.address}
                      </h3>
                      <h3 className="outfit-medium text-[20px] my-[6px]  text-[#3c3b3bab]">
                        <span className="text-[black] outfit-small">
                          Description:{" "}
                        </span>
                        <p className="mt-[10px] w-full text-[16px] outfit-small">
                          {doctor.des}
                        </p>
                      </h3>
                    </div>
                  )}

                  <h4 className="outfit-medium text-[20px] my-[12px]">
                    Other Informations
                  </h4>
                  <h3 className="outfit-medium text-[18px] text-center md:text-start my-[8px] underline">
                    Appointment Fees
                  </h3>
                  <div className="md:flex gap-[35px]">
                    {doctor?.service_fees.map((sf, index) => (
                      <div key={index} className="my-[6px] md:w-fit ">
                        <p className="text-[23px] outfit-medium mb-[9px]">
                          {sf.term}
                        </p>
                        <span className="block text-[14px] outfit-small">
                          Consultation: ${sf.fees.consulting}
                        </span>
                        <span className="block text-[14px] outfit-small">
                          Medical Treatment: ${sf.fees.treatment}
                        </span>
                      </div>
                    ))}
                  </div>
                  <h3 className="outfit-medium text-[20px] my-[9px]  text-[#3c3b3bab] capitalize">
                    <span className="text-[black] outfit-small">
                      Registered On:{" "}
                    </span>
                    {new Date(doctor.registerAt).toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          )}
          {tab === "tab2" && <DoctorsAppointments appointment={appointment} />}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

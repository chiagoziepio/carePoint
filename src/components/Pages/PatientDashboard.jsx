import { Avatar, Button, Form, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useUpdatePatientDetailsMutation,
  useUpdatePatientPicMutation,
} from "../../Redux/features/Patients/PatientApi";
import { trackUser } from "../../Redux/Api/AppSlice";
const PatientDashboard = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const patient = useSelector((state) => state.PatientReducer.patient);
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(patient ? patient?.pic : null);

  useEffect(() => {
    if (patient === null) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const [updatePatientDetails, { isLoading }] =
    useUpdatePatientDetailsMutation();
  const [updatePatientPic, { isLoading: isChangingPic }] =
    useUpdatePatientPicMutation();

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    return false;
  };

  const changePatientPic = async () => {
    try {
      if (fileList.length < 0) {
        return message.error("attach a photo");
      }
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
      const res = await updatePatientPic(formData).unwrap();
      const data = res;
      dispatch(trackUser(data.user));
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
      console.log(error);
      setImageUrl(patient ? patient?.pic : null);
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    changePatientPic();
  };

  const handleChange = (e) => {
    const regex = /^[0-9+\-()]*$/;
    const value = e.target.value;

    if (regex.test(value)) {
      e.target.value = value;
    } else {
      e.target.value = value.replace(/[^0-9+\-()]/g, "");
    }
  };

  const onFinnish = async (values) => {
    try {
      const res = await updatePatientDetails(values).unwrap();
      const data = res;
      dispatch(trackUser(data.user));
      message.success(data.msg);
      setIsEditing(false);
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        fullname: patient.fullname,
      });
    }
  }, [patient, form]);

  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div className="w-full sm:w-[60%]">
        <div className="flex gap-x-[10px] flex-wrap mt-[40px]">
          <Avatar shape="square" size={150} src={imageUrl} />
          <Upload
            showUploadList={false}
            beforeUpload={handleUpload}
            onChange={onChange}
            disabled={isChangingPic}
            accept=".png,.jpg,.jpeg"
          >
            <div className="bg-[#EFEBFF] w-[150px] h-[150px] flex flex-col gap-y-[15px] justify-center items-center cursor-pointer rounded-[7px]">
              <span className="bg-[#D6DAFF] w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                <FaUserAlt size={30} className="text-white" />
              </span>
              <span className="text-[14px] outfit-small ">upload picture</span>
            </div>
          </Upload>
        </div>
        <div>
          <Form form={form} onFinish={onFinnish} layout="vertical">
            <div className="mt-[30px]">
              {isEditing ? (
                <Form.Item
                  label="fullname"
                  className="md:w-[60%]"
                  name={"fullname"}
                >
                  <Input />
                </Form.Item>
              ) : (
                <h3 className="text-[26px] md:text-[32px] outfit-medium">
                  {patient?.fullname}
                </h3>
              )}

              <hr className="h-[2px] bg-[#ADADAD] mb-[10px]" />
              {!isEditing && (
                <Link
                  to={"/patient-appointment"}
                  className=" text-[17px] outfit-small text-blue-500 underline cursor-pointer"
                >
                  <p>My Appointments</p>
                </Link>
              )}
              <div className="mt-[20px]">
                <p className="font-normal text-[16px] text-[#797979] underline">
                  CONTACT INFORMATION
                </p>
                <div className="text-[#4B5563] flex flex-col gap-[10px] mt-[20px]">
                  <div className="flex gap-x-[10px] md:gap-x-[50px]">
                    <span>Email:</span>
                    {isEditing ? (
                      <Form.Item
                        name={"email"}
                        className="w-[70%] md:w-[350px]"
                      >
                        <Input />
                      </Form.Item>
                    ) : (
                      <span className="text-[#3C96FF]">{patient?.email}</span>
                    )}
                  </div>
                  <div className="flex gap-x-[10px] md:gap-x-[50px]">
                    <span>Phone Number:</span>
                    {isEditing ? (
                      <Form.Item
                        name={"phone"}
                        className="w-[50%] md:w-[350px]"
                      >
                        <Input onInput={handleChange} />
                      </Form.Item>
                    ) : (
                      <span className="text-[#3C96FF]">{patient?.phone}</span>
                    )}
                  </div>
                  <div className="flex gap-x-[10px] md:gap-x-[50px]">
                    <span>Address:</span>
                    {isEditing ? (
                      <Form.Item
                        name={"address"}
                        className="w-[70%] md:w-[350px]"
                      >
                        <Input />
                      </Form.Item>
                    ) : (
                      <span className="text-wrap">{patient?.address}</span>
                    )}
                  </div>
                </div>
                <div className="mt-[20px]">
                  <p className="font-normal text-[16px] text-[#797979] underline">
                    BASIC INFORMATION
                  </p>
                  <div className="text-[#4B5563] flex flex-col gap-[10px] mt-[10px]">
                    <p className="flex gap-x-[10px] md:gap-x-[50px]">
                      <span>Gender:</span>
                      <span className="text-wrap">{patient?.gender}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[30px] flex gap-[15px] flex-wrap">
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                disabled={isLoading}
                className="text-[15px] outline-none cursor-pointer border border-[#70cca1] w-[127px] h-[47px] md:h-[50px] rounded-[47px] flex justify-center items-center"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <Button
                  htmlType="submit"
                  disabled={isLoading}
                  className="text-[15px] outline-none cursor-pointer border border-[#70cca1] !bg-transparent h-[47px] md:h-[50px] w-[207px] rounded-[47px] flex justify-center items-center"
                >
                  Save Information
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

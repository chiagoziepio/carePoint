import { Avatar, Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const patient = useSelector((state) => state.PatientReducer.patient);
  useEffect(() => {
    if (patient === null) {
      navigate("/");
    }
  }, []);

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
    console.log(values);
  };
  form.setFieldsValue({
    email: patient?.email,
    phone: patient?.phone,
    address: patient?.address,
    fullname: patient?.fullname,
  });
  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div className="w-full sm:w-[60%]">
        <div className="flex gap-x-[10px] flex-wrap mt-[40px]">
          <Avatar shape="square" size={150} src={patient ? patient.pic : ""} />
          <Upload>
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

              <hr className="h-[2px] bg-[#ADADAD]" />
              <div className="mt-[30px]">
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
                onClick={() => setIsEditing(!isEditing)}
                className="text-[15px] outline-none cursor-pointer border border-[#70cca1] w-[127px] h-[47px] md:h-[50px] rounded-[47px] flex justify-center items-center"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <Button
                  htmlType="submit"
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

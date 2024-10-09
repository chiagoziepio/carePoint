import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { usePatientLoginMutation } from "../../Redux/features/Patients/PatientApi";
import { useDoctorLoginMutation } from "../../Redux/features/Doctor/DoctorApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { trackUser } from "../../Redux/Api/AppSlice";
const Login = () => {
  const [patientLogin, { isLoading: patientLoginLoading }] =
    usePatientLoginMutation();
  const [doctorLogin, { isLoading: doctorLoginLoading }] =
    useDoctorLoginMutation();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.AppReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      return navigate(-1);
    }
  }, []);
  const onFinish = async (values) => {
    try {
      const res = values.isDoctor
        ? await doctorLogin(values).unwrap()
        : await patientLogin(values).unwrap();
      const data = res;
      dispatch(trackUser(data.user));
      if (data.user.role === "doctor" && data.user.firstTimeLogin === true) {
        return navigate("/redirect");
      }
      message.success(data.msg);
      navigate("/");
      form.resetFields();
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  return (
    <div className="md:h-[600px] flex-grow res p-[10px] flex justify-center items-center ">
      <div className="w-full md:w-[500px] h-fit p-[15px] bg-white rounded-[20px]">
        <div className="mb-[20px]">
          <h3 className="text-[22px] md:text-[26px] outfit-bold md:leading-[32px]">
            Login
          </h3>
          <p className="text-[18px] outfit-medium text-[#4B5563]">
            Please login to book appointment
          </p>
        </div>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true },
                { whitespace: true, message: "Email cannot be just spaces" },
              ]}
            >
              <Input
                className="h-[44px]"
                disabled={patientLoginLoading || doctorLoginLoading}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                { required: true },
                { whitespace: true, message: "Password cannot be just spaces" },
              ]}
            >
              <Input.Password
                className="h-[44px]"
                disabled={patientLoginLoading || doctorLoginLoading}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name={"isDoctor"} valuePropName="checked">
              <Checkbox
                className="custom-checkbox"
                disabled={patientLoginLoading || doctorLoginLoading}
              >
                Are you registered as a Doctor on CarePoint?
              </Checkbox>
            </Form.Item>
          </div>
          <div className="flex gap-x-[7px]">
            <p>Has no account? </p>
            <Link to={"/register"} className="underline">
              register
            </Link>
          </div>
          <div>
            <Form.Item>
              <Button
                htmlType="submit"
                disabled={patientLoginLoading || doctorLoginLoading}
                className="bg-bg-banner flex justify-center items-center h-[46px] rounded-[6px] text-white w-full text-[18px]"
              >
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

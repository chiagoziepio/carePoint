import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { usePatientLoginMutation } from "../../Redux/features/Patients/PatientApi";
const Login = () => {
  const [patientLogin, { isLoading }] = usePatientLoginMutation();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await patientLogin(values).unwrap();
      const data = res;
      message.success(data.msg);
      navigate("/");
    } catch (error) {
      message.error(error.data.msg);
    } finally {
      form.resetFields();
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
              <Input className="h-[44px]" disabled={isLoading} />
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
              <Input.Password className="h-[44px]" disabled={isLoading} />
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
                disabled={isLoading}
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

import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
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
        <Form layout="vertical">
          <div>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[{ required: true }]}
            >
              <Input className="h-[44px]" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[{ required: true }]}
            >
              <Input className="h-[44px]" />
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

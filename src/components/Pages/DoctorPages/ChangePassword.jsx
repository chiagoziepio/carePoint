import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDoctorfirstTimeChangePwdMutation } from "../../../Redux/features/Doctor/DoctorApi";
import { trackUser } from "../../../Redux/Api/AppSlice";
const ChangePassword = () => {
  const user = useSelector((state) => state.AppReducer.user);
  const navigate = useNavigate();
  const [doctorfirstTimeChangePwd] = useDoctorfirstTimeChangePwdMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || user.role !== "doctor" || !user.firstTimeLogin) {
      return navigate("/");
    }
  }, []);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const res = await doctorfirstTimeChangePwd({
        password: values.password,
      }).unwrap();
      const data = res;
      message.success(data.msg);
      dispatch(trackUser(data.user));
      navigate("/");
      form.resetFields();
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  return (
    <div className="h-full flex-grow res p-[10px] md:flex justify-center items-center ">
      <div className="w-full md:w-[500px] p-[10px] bg-white rounded-[10px] mt-[40px] md:mt-0">
        <h3 className="outfit-medium text-[22px] mb-[10px] md:text-[27px]">
          You are requested to change your Password
        </h3>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              { required: true },
              { whitespace: true, message: "Password cannot be just spaces" },
            ]}
          >
            <Input.Password
              placeholder="********"
              className="w-full h-[44px]"
            />
          </Form.Item>
          <Form.Item
            name={"cPwd"}
            label="Repeat Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              { whitespace: true, message: "Password cannot be just spaces" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("password do not match");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="********"
              className="w-full h-[44px]"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-bg-banner text-white w-full flex justify-center items-center h-[47px] rounded-[7px] text-[20px] "
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;

import { Avatar, Button, Form, Input, message, Select, Upload } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateDoctorMutation } from "../../../Redux/features/Admin/AdminApi";

const AddDoctor = () => {
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const [form] = Form.useForm();
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();
  const fields = [
    "Dermatology",
    "Gastroenterology",
    "Gynecology",
    "Neurology",
    "Pediatricians",
    "General_Physician",
  ];

  const feesTerm = useSelector((state) => state.AdminReducer.feesTerms);

  const handleChange = (e) => {
    const regex = /^[0-9+\-()]*$/;
    const value = e.target.value;

    if (regex.test(value)) {
      e.target.value = value;
    } else {
      e.target.value = value.replace(/[^0-9+\-()]/g, "");
    }
  };
  const handleSelectChange = (value) => {
    if (value.length > 3) {
      message.warning("You can only select up to 3 items.");
      value.pop();
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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    form.setFieldsValue({
      file: newFileList[0]?.originFileObj || null,
    });
  };

  // form submission
  const onFinish = async (values) => {
    //console.log(values);
    const choosedSpeciality = feesTerm.filter((fees) =>
      values.specialty.includes(fees.term)
    );
    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("specialty", JSON.stringify(values.specialty));
    formData.append("yearsInService", values.yearsInService);
    formData.append("password", values.password);
    formData.append("qualification", values.qualification);
    choosedSpeciality.forEach((speciality, index) => {
      formData.append(`specialties[${index}][term]`, speciality.term);
      formData.append(
        `specialties[${index}][consulting]`,
        speciality.fees.consulting
      );
      formData.append(
        `specialties[${index}][treatment]`,
        speciality.fees.treatment
      );
    });
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }
    if (values.address !== undefined) {
      formData.append("address", values.address);
    }
    if (values.des !== undefined) {
      formData.append("des", values.des);
    }

    /* for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: File Name: ${value.name}, File Size: ${value.size}, File Type: ${value.type}`
        );
      } else {
        console.log(`${key}:`, value);
      }
    } */
    try {
      const res = await createDoctor(formData).unwrap();
      const data = res;
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }
  };
  return (
    <div className="h-full flex-grow res p-[10px] ">
      <div>
        <h3 className="outfit-medium text-[24px] text-center md:text-left">
          Add Doctor
        </h3>
        <div className="bg-white p-[10px] w-full md:w-[700px] rounded-[5px] mt-[40px]">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            className="md:w-[600px] w-full mt-[40px] md:ml-[20px]"
          >
            <div className="flex gap-x-[15px] items-center ml-[50px] mt-[20px]">
              <Avatar shape="circle" size={100} src={imageUrl} />
              <Form.Item name={"file"}>
                <Upload
                  showUploadList={false}
                  beforeUpload={handleUpload}
                  onChange={onChange}
                >
                  <p className="text-[#7B7B7B] text-[20px] cursor-pointer">
                    Upload doctor <br /> picture
                  </p>
                </Upload>
              </Form.Item>
            </div>
            <div>
              <div className="md:flex gap-x-[25px] w-full justify-between">
                <Form.Item
                  name={"fullname"}
                  label="Doctor name"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" />
                </Form.Item>

                <Form.Item
                  name={"specialty"}
                  label="specialty "
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Select
                    className="h-[40px] w-full"
                    mode="multiple"
                    maxTagCount={3}
                    onChange={handleSelectChange}
                  >
                    {fields.map((field, index) => (
                      <Select.Option value={field} key={index}>
                        {field}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="md:flex gap-x-[25px] w-full justify-between">
                <Form.Item
                  name={"email"}
                  label="Doctor Email"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" />
                </Form.Item>
                <Form.Item
                  name={"qualification"}
                  label="Education"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" />
                </Form.Item>
              </div>
              <div className="md:flex gap-x-[25px] w-full justify-between">
                <Form.Item
                  name={"password"}
                  label="Doctor Password"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input.Password className="h-[40px]" />
                </Form.Item>
                <Form.Item
                  name={"address"}
                  label="Address"
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" />
                </Form.Item>
              </div>
              <div className="md:flex gap-x-[25px] w-full justify-between">
                <Form.Item
                  name={"phone"}
                  label="Phone Number"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" onInput={handleChange} />
                </Form.Item>
                <Form.Item
                  name={"yearsInService"}
                  label="Exprience"
                  rules={[{ required: true }]}
                  className="md:w-[50%] w-full"
                >
                  <Input className="h-[40px]" onInput={handleChange} />
                </Form.Item>
              </div>
              <div>
                <Form.Item name={"des"} label="Doctor's Description">
                  <TextArea placeholder="decribe the doctor" autoSize />
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="w-full bg-bg-banner md:w-[130px] rounded-[6px] md:rounded-[20px] text-white h-[48px] flex justify-center items-center text-[19px]"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;

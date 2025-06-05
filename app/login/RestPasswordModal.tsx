import { Form, Input, Modal } from "antd";
import React from "react";
import { restPasswordApi } from "../util/api";
import { toast } from "react-toastify";

interface Props {
  isConfirm: boolean;
  setIsConfirm: () => void;
  email: string;
}

const RestPasswordModal = ({ isConfirm, setIsConfirm, email }: Props) => {
  const [form1] = Form.useForm();

  const handleRest = async () => {
    const { otp_code, email, new_password } = await form1.validateFields();
    const res = (await restPasswordApi(email, otp_code, new_password)) as any;

    if (res.detail) {
      toast.error(res.detail);
    } else {
      toast.success("Đổi mật khẩu thành công");
      setIsConfirm();
    }
  };

  return (
    <Modal
      title="Tạo lại mật khẩu mới"
      open={isConfirm}
      onCancel={() => setIsConfirm()}
      onOk={handleRest}
      okText="Gửi yêu cầu"
      cancelText="Hủy"
      maskClosable={false}
    >
      <Form form={form1} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" value={email} />
        </Form.Item>
        <Form.Item
          label="OTP"
          name="otp_code"
          rules={[
            { required: true, message: "Vui lòng nhập otp!" },
            { type: "string", message: "Mã không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="new_password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới của bạn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RestPasswordModal;

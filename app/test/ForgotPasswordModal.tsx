// components/ForgotPasswordModal.tsx

import { Modal, Form, Input, message } from "antd";
import { FC } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const { email } = await form.validateFields();
      // TODO: Gửi email đến backend xử lý đổi mật khẩu
      console.log("Email gửi đi:", email);
      message.success("Link đổi mật khẩu đã được gửi đến email.");
      onClose();
    } catch (error) {
      // Form không hợp lệ, không làm gì cả
    }
  };

  return (
    <Modal
      title="Quên mật khẩu"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Gửi yêu cầu"
      cancelText="Hủy"
      maskClosable={false} // ❌ Không đóng khi click ra ngoài
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;

"use client";
// components/ForgotPasswordModal.tsx

import { Modal, Form, Input } from "antd";
import { FC } from "react";
import { toast } from "react-toastify";
import { changePasswordApi } from "../util/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal: FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async () => {
    const { old_password, new_password } = await form.validateFields();

    const res = (await changePasswordApi(old_password, new_password)) as any;
    if (res.message === "successful") {
      toast.success("Đổi mật khẩu thành công");
      localStorage.removeItem("access_token");
      setAuth({
        isAuthenticated: false,
        user: {
          email: "",
          user_name: "",
          role: "",
          img: "",
        },
      });
      router.push("/login");
    } else {
      toast.error("Mật khẩu cũ không chính xác");
    }
  };

  return (
    <>
      <Modal
        title="Quên mật khẩu"
        open={open}
        onCancel={onClose}
        onOk={handleSubmit}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        maskClosable={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mật khẩu cũ"
            name="old_password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
              { type: "string", message: "Mật khẩu không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập mật khẩu cũ của bạn" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="new_password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { type: "string", message: "Mật khẩu không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập mật khẩu mới của bạn" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;

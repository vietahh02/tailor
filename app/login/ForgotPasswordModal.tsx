"use client";
// components/ForgotPasswordModal.tsx

import { Modal, Form, Input } from "antd";
import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import { forgetPasswordApi, restPasswordApi } from "../util/api";
import RestPasswordModal from "./RestPasswordModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const [isConfirm, setIsConfirm] = useState(false);
  const [emailC, setEmailC] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const { email } = await form.validateFields();
      const res = (await forgetPasswordApi(email)) as any;
      if (res?.message) {
        console.log("Email gửi đi:", email);
        setEmailC(email);
        toast.success("Link đổi mật khẩu đã được gửi đến email.");
        onClose();
        setIsConfirm(true);
      } else {
        toast.error("Email không đúng hoặc không hợp lệ!!!");
      }
    } catch (error) {
      toast.error("Email không đúng hoặc không hợp lệ!!!");
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

      <RestPasswordModal
        email={emailC}
        isConfirm={isConfirm}
        setIsConfirm={() => setIsConfirm(false)}
      />
    </>
  );
};

export default ForgotPasswordModal;

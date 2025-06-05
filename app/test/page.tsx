// pages/login.tsx (hoặc app/login/page.tsx nếu dùng App Router)

"use client";

import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import ForgotPasswordModal from "./ForgotPasswordModal"; // đường dẫn đúng

const { Link } = Typography;

const LoginPage = () => {
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleLogin = (values: any) => {
    console.log("Đăng nhập:", values);
    // TODO: gọi API đăng nhập
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Đăng nhập</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Link onClick={() => setForgotOpen(true)}>Quên mật khẩu?</Link>
        </Form.Item>
      </Form>

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
};

export default LoginPage;

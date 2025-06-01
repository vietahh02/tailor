import React from "react";
import { Modal, Form, Input } from "antd";
import { Form as BootstrapForm } from "react-bootstrap";

export interface NewUser {
  username: string;
  password: string;
  role: string;
}

interface Props {
  open: boolean;
  onCreate: (user: NewUser) => void;
  onCancel: () => void;
}

const roles = [
  { key: "admin", role: "Admin" },
  { key: "user", role: "User" },
];

const AddUserModal: React.FC<Props> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title="Thêm mới người dùng"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn role!" }]}
        >
          <BootstrapForm.Select aria-label="Default select example">
            {roles.map((r) => (
              <option key={r.key} value={r.key} selected={"user" === r.key}>
                {r.role}
              </option>
            ))}
          </BootstrapForm.Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;

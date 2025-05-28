import React from "react";
import { Modal, Descriptions, Avatar } from "antd";

interface User {
  id: number;
  avatar: string;
  name: string;
  status: boolean;
  username: string;
  address: string;
  phone: string;
  role: number;
}

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<Props> = ({ open, user, onClose }) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      title={`Thông tin chi tiết - ${user.name}`}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar src={user.avatar} size={100} />
      </div>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Tên">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{user.address}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {user.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {user.status ? (
            <p style={{ color: "green" }}>Active</p>
          ) : (
            <p style={{ color: "red" }}>Inactive</p>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserDetailModal;

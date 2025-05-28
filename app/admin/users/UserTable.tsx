"use client";

import React, { useState } from "react";
import { Table, Button, Space, Avatar, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserDetailModal from "./UserDetailModal";
import { Form } from "react-bootstrap";
import AddUserModal from "./AddUserModal";

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

const sampleUsers: User[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Nguyễn Văn A",
    status: true,
    username: "nguyenvana",
    address: "1",
    phone: "123",
    role: 2,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Trần Thị B",
    status: false,
    username: "tranthib",
    address: "2",
    phone: "12543",
    role: 1,
  },
];

const roles = [
  { key: 1, role: "Admin" },
  { key: 2, role: "User" },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleView = (record: User) => {
    setSelectedUser(record);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setAddModalOpen(false);
  };

  const handleBan = (record: User) => {
    message.warning(`Đã cấm: ${record.name}`);
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => <Avatar src={url} style={{ width: 100, height: 100 }} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) =>
        s ? (
          <p style={{ color: "green" }}>Active</p>
        ) : (
          <p style={{ color: "red" }}>Inactive</p>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleView(record)}>
            Xem chi tiết
          </Button>
          {record.status ? (
            <Popconfirm
              title={`Bạn có chắc muốn cấm ${record.name}?`}
              onConfirm={() => handleBan(record)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger type="primary">
                Ban
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title={`Bạn có chắc muốn gỡ cấm ${record.name}?`}
              onConfirm={() => handleBan(record)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="primary" style={{ background: "green" }}>
                UnBan
              </Button>
            </Popconfirm>
          )}
          <Form.Select aria-label="Default select example">
            {roles.map((r) => (
              <option
                key={r.key}
                value={r.key}
                selected={record.role === r.key}
              >
                {r.role}
              </option>
            ))}
          </Form.Select>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" onClick={() => setAddModalOpen(true)}>
          Thêm mới người dùng
        </Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <UserDetailModal
        open={modalOpen}
        user={selectedUser}
        onClose={handleModalClose}
      />
      <AddUserModal
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onCreate={handleAddUser}
      />
    </div>
  );
};

export default UserTable;

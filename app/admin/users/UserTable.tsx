"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, Avatar, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import UserDetailModal from "./UserDetailModal";
import { Form } from "react-bootstrap";
import AddUserModal from "./AddUserModal";
import { changeRole, changeStatus, getAllUsers } from "@/app/util/apiAdmin";
import { toast } from "react-toastify";

interface User {
  id: number;
  avatar_image: string;
  user_name: string;
  status: string;
  full_name: string;
  address: string;
  phone: string;
  role: string;
}

const roles = [
  { key: "admin", role: "Admin" },
  { key: "user", role: "User" },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = (await getAllUsers()) as any;
      setUsers(response);
      console.log(response);
    };
    fetchUsers();
  }, []);

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

  const handleBan = async (record: User) => {
    const res = (await changeStatus(
      record.id,
      record.status === "active" ? "inactive" : "active"
    )) as any;
    if (record.status === "active") {
      record.status = "inactive";
    } else {
      record.status = "active";
    }
    if (res) {
    }
    setUsers((prev) =>
      prev.map((r) => {
        if (r.id === record.id) {
          return record;
        }
        return r;
      })
    );
    if (res?.message === "successful") {
      toast.success("Thay đổi thành công");
    } else {
      toast.error("Thay đổi thất bại" + res.messgae);
    }
  };
  const handleChangeRole = async (id: number, role: string) => {
    if (role === "user") {
      role = "admin";
    } else {
      role = "user";
    }
    const res = (await changeRole(id, role)) as any;
    if (res?.message === "successful") {
      toast.success("Thay đổi thành công");
    } else {
      toast.error("Thay đổi thất bại" + res.messgae);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar_image",
      key: "avatar",
      render: (url) => <Avatar src={url} style={{ width: 100, height: 100 }} />,
    },
    {
      title: "Tên",
      dataIndex: "user_name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) =>
        s === "active" ? (
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
          {record.status === "active" ? (
            <Popconfirm
              title={`Bạn có chắc muốn cấm ${record.user_name}?`}
              onConfirm={() => handleBan(record)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger type="primary" onClick={() => handleBan(record)}>
                Ban
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title={`Bạn có chắc muốn gỡ cấm ${record.user_name}?`}
              onConfirm={() => handleBan(record)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="primary"
                style={{ background: "green" }}
                onClick={() => handleBan(record)}
              >
                UnBan
              </Button>
            </Popconfirm>
          )}
          <Form.Select
            aria-label="Default select example"
            onChange={() => handleChangeRole(record.id, record.role)}
          >
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

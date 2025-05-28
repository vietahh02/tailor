"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

interface UserInfo {
  avatarUrl: string;
  fullName: string;
  nickName: string;
  phone: string;
  address: string;
  email: string;
}

const initialUserInfo: UserInfo = {
  avatarUrl: "", // mặc định chưa có ảnh
  fullName: "Nguyen Van A",
  nickName: "vanA",
  phone: "0912345678",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  email: "vana@example.com",
};

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  // Hàm so sánh thông tin mới với ban đầu để enable nút lưu
  const checkChanged = (values: UserInfo) => {
    if (
      values.fullName !== userInfo.fullName ||
      values.nickName !== userInfo.nickName ||
      values.phone !== userInfo.phone ||
      values.address !== userInfo.address ||
      values.email !== userInfo.email ||
      (avatarFileList.length > 0 &&
        avatarFileList[0].url !== userInfo.avatarUrl)
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  // Khi form thay đổi
  const onValuesChange = (_: any, allValues: UserInfo) => {
    checkChanged(allValues);
  };

  // Xử lý upload ảnh avatar
  const handleAvatarChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let fileList = [...info.fileList];

    // Giữ lại chỉ 1 file (avatar)
    fileList = fileList.slice(-1);

    // Đọc ảnh để preview
    fileList = fileList.map((file) => {
      if (file.originFileObj) {
        file.url = URL.createObjectURL(file.originFileObj);
      }
      return file;
    });

    setAvatarFileList(fileList);

    // Check thay đổi (ảnh có thể đã khác avatarUrl ban đầu)
    setIsChanged(true);
  };

  const onSave = () => {
    form.validateFields().then((values) => {
      // Cập nhật user info mới
      const newAvatarUrl =
        avatarFileList.length > 0
          ? avatarFileList[0].url || ""
          : userInfo.avatarUrl;

      const newUserInfo = {
        avatarUrl: newAvatarUrl,
        ...values,
      };

      setUserInfo(newUserInfo);
      setIsChanged(false);
      message.success("Thông tin cá nhân đã được lưu!");
    });
  };

  // Load dữ liệu ban đầu vào form khi userInfo thay đổi
  useEffect(() => {
    form.setFieldsValue(userInfo);
    setAvatarFileList(
      userInfo.avatarUrl
        ? [
            {
              uid: "-1",
              name: "avatar.png",
              status: "done",
              url: userInfo.avatarUrl,
            },
          ]
        : []
    );
  }, [userInfo, form]);

  return (
    <div
      style={{
        maxWidth: 650,
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: 6,
      }}
    >
      <h2>Thông tin cá nhân</h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={userInfo}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="Ảnh đại diện">
          <Upload
            listType="picture-circle"
            fileList={avatarFileList}
            onChange={handleAvatarChange}
            beforeUpload={(file: RcFile) => {
              // Chặn upload tự động, chỉ giữ trong state
              return false;
            }}
            maxCount={1}
          >
            {avatarFileList.length === 0 && (
              <UserOutlined style={{ fontSize: 40 }} />
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Họ tên đầy đủ"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input placeholder="Họ tên đầy đủ" />
        </Form.Item>

        <Form.Item
          label="Nickname"
          name="nickName"
          rules={[{ required: true, message: "Vui lòng nhập nick name" }]}
        >
          <Input placeholder="Nickname" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^\d{10,11}$/,
              message: "Số điện thoại phải gồm 10 hoặc 11 chữ số",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" maxLength={11} />
        </Form.Item>

        <Form.Item label="Địa chỉ nhà" name="address">
          <Input.TextArea placeholder="Địa chỉ nhà" rows={2} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={onSave} disabled={!isChanged} block>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Upload, Modal, Image } from "antd";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { getInfoUser, updateUser } from "../util/api";
import { toast } from "react-toastify";
import FullScreenSpinner from "../loading/Spiner";

interface UserInfo {
  id: number;
  avatar_image: string;
  full_name: string;
  user_name: string;
  phone: string;
  address: string;
  email: string;
}

const initialUserInfo: UserInfo = {
  id: 0,
  avatar_image: "",
  full_name: "",
  user_name: "",
  phone: "",
  address: "",
  email: "",
};

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const userOld = useRef<UserInfo>(initialUserInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getInfoUser()) as any;
      if (!res?.message) {
        setUserInfo({
          id: res.id,
          avatar_image: res.avatar_image,
          full_name: res.full_name,
          user_name: res.user_name,
          phone: res.phone,
          address: res.address,
          email: res.email,
        });
        userOld.current = userInfo;
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    form.setFieldsValue(userInfo);
    if (userInfo.avatar_image) {
      const fileList: UploadFile[] = [
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: userInfo.avatar_image,
        },
      ];
      setAvatarFileList(fileList);
      setPreviewImage(userInfo.avatar_image);
    }
  }, [userInfo, form]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Xem trước ảnh");
  };

  const handleChange = (info: { fileList: UploadFile[] }) => {
    setAvatarFileList(info.fileList.slice(-1)); // chỉ giữ 1 ảnh
    setIsChanged(true);
  };

  const onValuesChange = (_: unknown, allValues: UserInfo) => {
    const hasAvatarChanged =
      avatarFileList.length > 0 &&
      avatarFileList[0].originFileObj !== undefined;

    if (
      allValues.full_name !== userInfo.full_name ||
      allValues.user_name !== userInfo.user_name ||
      allValues.phone !== userInfo.phone ||
      allValues.address !== userInfo.address ||
      allValues.email !== userInfo.email ||
      hasAvatarChanged
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const onSave = async () => {
    try {
      const values = await form.validateFields();

      const avatarFile =
        avatarFileList.length > 0 ? avatarFileList[0].originFileObj : undefined;

      const res = (await updateUser(
        userInfo.id,
        userOld?.current?.email !== values.email ? values.email : undefined,
        userOld?.current?.phone !== values.phone ? values.phone : undefined,
        values.address,
        avatarFile,
        values.full_name
      )) as any;

      if (res.message === "User updated successfully") {
        toast.success("Lưu thông tin thành công!");
        setIsChanged(false);
      } else {
        toast.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin!");
    }
  };

  return (
    <div style={{ maxWidth: 650, margin: "30px auto", padding: "20px" }}>
      <h2>Thông tin cá nhân</h2>

      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={userInfo}
        >
          <Form.Item
            label="Ảnh đại diện"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Image src={previewImage} alt="" style={{ display: "none" }} />
            <Upload
              listType="picture-circle"
              beforeUpload={() => false}
              fileList={avatarFileList}
              onChange={handleChange}
              onPreview={handlePreview}
              maxCount={1}
              showUploadList={{
                showRemoveIcon: true,
                showPreviewIcon: true,
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Thay ảnh</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Họ tên đầy đủ"
            name="full_name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nickname"
            name="user_name"
            rules={[{ required: true, message: "Vui lòng nhập nick name" }]}
          >
            <Input disabled />
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
            <Input maxLength={11} />
          </Form.Item>

          <Form.Item label="Địa chỉ nhà" name="address">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={onSave} disabled={!isChanged} block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image src={previewImage} alt="Xem trước" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}

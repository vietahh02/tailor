"use client";

import React, { useState } from "react";
import { Form, Input, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddressSelector from "./VietNamAddress";
import { toast } from "react-toastify";
import type { UploadFile } from "antd/es/upload/interface";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: [] as string[],
    address2: "",
    note: "",
    images: [] as File[],
    feeShip: 0,
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Form data updated:", { ...formData, [name]: value });
  };

  const handlePreview = () => {
    toast.info("Hiển thị hướng dẫn đo móng (chức năng mô phỏng).");
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);

    const files = fileList
      .map((file) => file.originFileObj)
      .filter(Boolean) as File[];

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleRemove = (file: UploadFile) => {
    const newList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newList);

    const remainingFiles = newList
      .map((file) => file.originFileObj)
      .filter(Boolean) as File[];

    setFormData((prev) => ({
      ...prev,
      images: remainingFiles,
    }));
  };

  const handleImagePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreviewImage(src);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Ảnh xem trước");
  };

  return (
    <Form className="ck-form-section" layout="vertical">
      <h2>Thông tin khách hàng</h2>

      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
      >
        <Input
          size="large"
          name="fullName"
          placeholder="Nhập họ tên"
          value={formData.fullName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Số điện thoại phải gồm 10 chữ số",
          },
        ]}
      >
        <Input
          size="large"
          name="phone"
          placeholder="Nhập số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>

      <Form.Item label="Địa chỉ" required>
        <AddressSelector formData={formData} setFormData={setFormData} />
      </Form.Item>

      <Form.Item
        label="Địa chỉ cụ thể"
        name="address2"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
      >
        <Input
          size="large"
          name="address2"
          placeholder="Nhập địa chỉ"
          value={formData.address2}
          onChange={handleChange}
        />
      </Form.Item>

      {/* Upload ảnh với preview và xóa */}
      <Form.Item label="Ảnh size móng">
        <div style={{ marginBottom: 8 }}>
          <Button type="primary" onClick={handlePreview}>
            Hướng dẫn đo móng
          </Button>
        </div>
        <Upload
          listType="picture-card"
          multiple
          accept="image/*"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleUploadChange}
          onRemove={handleRemove}
          onPreview={handleImagePreview}
        >
          {fileList.length >= 8 ? null : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
            </div>
          )}
        </Upload>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>

      <Form.Item label="Ghi chú (tuỳ chọn)" name="note">
        <Input.TextArea
          name="note"
          placeholder="Nhập ghi chú nếu có"
          value={formData.note}
          onChange={handleChange}
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;

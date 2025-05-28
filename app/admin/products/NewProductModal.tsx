import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  message,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { TextArea } = Input;

export interface ProductFormValues {
  name: string;
  price: number;
  discount: number;
  description: string;
  categories: string[];
  images: File[];
}

interface AddProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const categoryOptions = ["Thời trang", "Điện tử", "Đồ gia dụng", "Thực phẩm"];

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const images = values.images?.map(
        (file: UploadFile) => file.originFileObj
      );
      onSubmit({ ...values, images });
      form.resetFields();
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  return (
    <Modal
      title="Thêm sản phẩm mới"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Giảm giá (0% - 100%)"
          name="discount"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giảm giá!",
            },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Giảm giá phải từ 0 đến 100",
            },
          ]}
        >
          <InputNumber step={1} min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Thể loại"
          name="categories"
          rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
        >
          <Checkbox.Group options={categoryOptions} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={() => false}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Thêm ảnh</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>

      {/* Modal preview ảnh */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Modal>
  );
};

export default AddProductModal;

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Image,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { TextArea } = Input;

export interface ProductFormValues {
  name: string;
  price: number;
  discount?: number;
  description?: string;
  category: string[];
  images: File[];
  job?: string[];
  pattern?: string[];
  nail_length?: string;
  purpose?: string[];
  occasion?: string[];
}

interface AddProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const categoryOptions = [
  "Nữ tính / dịu dàng",
  "Cá tính / nổi bật",
  "Tối giản / thanh lịch",
  "Sang trọng / quý phái",
  "Dễ thương / năng động",
];

const jobs = [
  "Văn phòng",
  "Nghệ thuật",
  "Sinh viên",
  "Lao động tay chân",
  "Tự do",
];

const patterns = ["Hoa lá", "Hoạt hình", "Đá", "Kim tuyến", "Trơn", "Vẽ tay"];

const length = ["Ngắn", "Trung bình", "Dài"];

const purpose = ["Đi chơi", "Đi làm", "Du lịch", "Dịp đặc biệt"];

const occasion = ["Valentine", "Giáng sinh", "Tết"];

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const normFile = (
    e: import("antd/es/upload/interface").UploadChangeParam<UploadFile>
  ) => {
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
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
        >
          <Checkbox.Group options={categoryOptions} />
        </Form.Item>

        <Form.Item
          label="Nghề nghiệp"
          name="job"
          rules={
            [
              // { required: true, message: "Vui lòng chọn nghề nghiệp phù hợp!" },
            ]
          }
        >
          <Checkbox.Group options={jobs} />
        </Form.Item>

        <Form.Item
          label="Họa tiết"
          name="pattern"
          rules={
            [
              // { required: true, message: "Vui lòng chọn họa tiết phù hợp!" },
            ]
          }
        >
          <Checkbox.Group options={patterns} />
        </Form.Item>

        <Form.Item
          label="Độ dài móng"
          name="nail_length"
          rules={[
            { required: true, message: "Vui lòng chọn độ dài móng phù hợp!" },
          ]}
        >
          <Radio.Group options={length} />
        </Form.Item>

        <Form.Item
          label="Mục đích làm móng"
          name="purpose"
          rules={
            [
              // { required: true, message: "Vui lòng chọn độ dài móng phù hợp!" },
            ]
          }
        >
          <Checkbox.Group options={purpose} />
        </Form.Item>

        <Form.Item
          label="Dịp đặc biệt"
          name="occasion"
          // rules={[{ required: true, message: "Vui lòng chọn dịp phù hợp!" }]}
        >
          <Checkbox.Group options={occasion} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          valuePropName="fileList"
          rules={[{ required: true, message: "Vui lòng thêm ảnh!" }]}
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

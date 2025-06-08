import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Image,
  Button,
  Space,
  Radio,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile } from "antd/es/upload/interface";

const { TextArea } = Input;

export interface ProductFormValues {
  id: number;
  name: string;
  price: number;
  discount: number;
  description: string;
  category: string[];
  images?: File[];
  job?: string;
  pattern?: string;
  nail_length?: string;
  purpose?: string;
  occasion?: string;
  delete_image_ids?: string;
  imageAr?: File;
}

interface EditProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
  product: {
    id: number;
    name: string;
    price: number;
    images: { id: number; url: string }[];
    description?: string;
    discount?: number;
    category: string;
    job?: string;
    pattern?: string;
    nail_length?: string;
    purpose?: string;
    occasion?: string;
    imageAr?: string;
  };
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

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  product,
}) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const [oldImages, setOldImages] = useState<{ id: number; url: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [selectedLength, setSelectedLength] = useState<string>();
  const [deleteImage, setDeleteImage] = useState<string[]>([]);

  const [previewOpenAr, setPreviewOpenAr] = useState(false);
  const [previewImageAr, setPreviewImageAr] = useState("");
  const [previewTitleAr, setPreviewTitleAr] = useState("");
  const [fileListAr, setFileListAr] = useState<UploadFile[]>([]);

  const handleCancelAr = () => setPreviewOpenAr(false);

  const handlePreviewAr = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Ar(file.originFileObj as File);
    }

    setPreviewImageAr(file.url || (file.preview as string));
    setPreviewOpenAr(true);
    setPreviewTitleAr(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChangeAr = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileListAr(fileList.slice(-1)); // giữ lại ảnh cuối cùng (chỉ 1 ảnh)
  };

  const getBase64Ar = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    console.log("Product data:", product);
    if (product) {
      form.setFieldsValue({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        category: product.category ? product.category.split(",") : [],
        job: product.job ? product.job.split(",") : [],
        pattern: product.pattern ? product.pattern.split(",") : [],
        purpose: product.purpose ? product.purpose.split(",") : [],
        occasion: product.occasion ? product.occasion.split(",") : [],
        nail_length: product.nail_length,
      });
      setOldImages(product.images || []);
      setSelectedCategories(product.category?.split(",") || []);
      setSelectedJobs(product.job?.split(",") || []);
      setSelectedPatterns(product.pattern?.split(",") || []);
      setSelectedPurpose(product.purpose?.split(",") || []);
      setSelectedOccasion(product.occasion?.split(",") || []);
      setSelectedLength(product.nail_length);
    }
  }, [product]);

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

  const normFile = (
    e: UploadChangeParam<UploadFile<RcFile>> | UploadFile<RcFile>[]
  ) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleRemoveOldImage = (i: { id: number; url: string }) => {
    setOldImages((prev) => prev.filter((img) => img.id !== i.id));
    setDeleteImage((prev) => [...prev, String(i.id)]);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newImages = values.images?.map(
        (file: UploadFile) => file.originFileObj
      );
      onSubmit({
        ...values,
        id: product.id,
        category: selectedCategories,
        job: selectedJobs,
        pattern: selectedPatterns,
        purpose: selectedPurpose,
        occasion: selectedOccasion,
        nail_length: selectedLength,
        delete_image_ids: deleteImage?.toString(),
        imageAr: fileListAr[0].originFileObj,

        images: newImages || [],
      });
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lưu"
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
            { required: true, message: "Vui lòng nhập giảm giá!" },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Giảm giá từ 0 đến 100",
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
          <Checkbox.Group
            options={categoryOptions}
            onChange={(checked) => setSelectedCategories(checked as string[])}
          />
        </Form.Item>

        <Form.Item label="Nghề nghiệp" name="job">
          <Checkbox.Group
            options={jobs}
            onChange={(checked) => setSelectedJobs(checked as string[])}
          />
        </Form.Item>

        <Form.Item label="Họa tiết" name="pattern">
          <Checkbox.Group
            options={patterns}
            onChange={(checked) => setSelectedPatterns(checked as string[])}
          />
        </Form.Item>

        <Form.Item
          label="Độ dài móng"
          name="nail_length"
          rules={[
            { required: true, message: "Vui lòng chọn độ dài móng phù hợp!" },
          ]}
        >
          <Radio.Group
            options={length}
            onChange={(e) => setSelectedLength(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Mục đích làm móng" name="purpose">
          <Checkbox.Group
            options={purpose}
            onChange={(checked) => setSelectedPurpose(checked as string[])}
          />
        </Form.Item>

        <Form.Item label="Dịp đặc biệt" name="occasion">
          <Checkbox.Group
            options={occasion}
            onChange={(checked) => setSelectedOccasion(checked as string[])}
          />
        </Form.Item>

        {/* Old Images Display */}
        {oldImages.length > 0 && (
          <Form.Item label="Ảnh cũ">
            <Space wrap>
              {oldImages.map((image) => (
                <div key={image.id} style={{ position: "relative" }}>
                  <Image
                    width={80}
                    height={80}
                    src={image.url}
                    style={{ borderRadius: 6 }}
                    alt=""
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => handleRemoveOldImage(image)}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ))}
            </Space>
          </Form.Item>
        )}

        {/* New Images Upload */}
        <Form.Item
          label="Thêm ảnh mới"
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

        {product.imageAr && (
          <Form.Item label="Ảnh AR cũ">
            <Image
              width={80}
              src={product.imageAr}
              alt="Ảnh AR cũ"
              style={{ borderRadius: 6 }}
            />
          </Form.Item>
        )}

        <Form.Item label="Ảnh AR mới" name="imageAr">
          <Upload
            listType="picture-card"
            fileList={fileListAr}
            onPreview={handlePreviewAr}
            onChange={handleChangeAr}
            beforeUpload={() => false}
          >
            {fileListAr.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>

      <Modal
        open={previewOpenAr}
        title={previewTitleAr}
        footer={null}
        onCancel={handleCancelAr}
      >
        <Image alt="Ảnh AR" style={{ width: "100%" }} src={previewImageAr} />
      </Modal>

      {/* Preview Modal */}
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

export default EditProductModal;

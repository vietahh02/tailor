import React, { useState } from "react";
import { Modal, Descriptions, Image } from "antd";

interface Product {
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
}

interface ViewProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({
  visible,
  product,
  onClose,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  if (!product) return null;

  const handleImageClick = (url: string) => {
    setPreviewImage(url);
    setPreviewOpen(true);
  };

  return (
    <>
      <Modal
        title="Chi tiết sản phẩm"
        open={visible}
        onCancel={onClose}
        footer={null}
        width={700}
      >
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Tên sản phẩm">
            {product.name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá">
            {product.price.toLocaleString()}₫
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá">
            {product.discount}%
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {product.description || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại">
            {product.category || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Nghề nghiệp">
            {product.job || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Độ dài móng">
            {product.nail_length || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Mục đích làm móng">
            {product.purpose || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Dịp đặc biệt">
            {product.occasion || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Hình ảnh">
            {(product.images || []).map((imgUrl, idx) => (
              <Image
                key={idx}
                width={80}
                src={imgUrl.url}
                style={{ paddingRight: 4, cursor: "pointer" }}
                onClick={() => handleImageClick(imgUrl.url)}
                preview={false}
                alt=""
              />
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      {/* Preview lớn khi click */}
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        title="Xem ảnh"
      >
        <Image alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ViewProductModal;

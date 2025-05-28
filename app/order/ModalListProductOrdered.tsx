"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Input, Rate, Form } from "antd";

type Product = {
  id: number;
  nameProduct: string;
  imageProduct: string;
  isReviewed: boolean;
  comment?: string;
  rating?: number;
};

type Props = {
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialProducts: Product[] = [
  {
    id: 1,
    nameProduct: "Áo thun trắng",
    imageProduct: "/products/shirt1.jpg",
    isReviewed: false,
  },
  {
    id: 2,
    nameProduct: "Quần jean xanh",
    imageProduct: "/products/jeans1.jpg",
    isReviewed: true,
    comment: "Chất lượng tốt",
    rating: 4,
  },
];

const ProductReviewModal = ({ openReview, setOpenReview }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const showRatingModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenRatingModal(true);
    form.setFieldsValue({
      comment: product.comment || "",
      rating: product.rating || 0,
    });
  };

  const handleFinish = (values: { comment: string; rating: number }) => {
    if (!selectedProduct) return;
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id
        ? {
            ...p,
            isReviewed: true,
            comment: values.comment,
            rating: values.rating,
          }
        : p
    );
    setProducts(updatedProducts);
    setOpenRatingModal(false);
  };

  const showDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenDetailModal(true);
  };

  return (
    <>
      {/* Modal 1: Danh sách sản phẩm */}
      <Modal
        title="Sản phẩm đã mua"
        open={openReview}
        onCancel={() => setOpenReview(false)}
        footer={null}
        width={1000}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <Image
                src={product.imageProduct}
                alt={product.nameProduct}
                width={100}
                height={100}
                preview={false}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {product.nameProduct}
                </div>
                <div style={{ color: product.isReviewed ? "green" : "red" }}>
                  {product.isReviewed ? "Đã đánh giá" : "Chưa đánh giá"}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {product.isReviewed ? (
                  <>
                    <Button onClick={() => showDetailModal(product)}>
                      Xem chi tiết
                    </Button>
                    <Button onClick={() => showRatingModal(product)}>
                      Sửa đánh giá
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => showRatingModal(product)}
                  >
                    Đánh giá
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal 2: Đánh giá */}
      <Modal
        open={openRatingModal}
        title={
          selectedProduct?.isReviewed
            ? "Sửa đánh giá sản phẩm: " + selectedProduct.nameProduct
            : "Đánh giá sản phẩm: " + selectedProduct?.nameProduct
        }
        onCancel={() => setOpenRatingModal(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Đánh giá (sao)"
            name="rating"
            rules={[{ required: true, message: "Vui lòng chọn số sao" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Nhận xét"
            name="comment"
            rules={[{ required: true, message: "Vui lòng nhập nhận xét" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal 3: Chi tiết đánh giá */}
      <Modal
        open={openDetailModal}
        title={`Chi tiết đánh giá sản phẩm: ${selectedProduct?.nameProduct}`}
        footer={null}
        onCancel={() => setOpenDetailModal(false)}
      >
        {selectedProduct && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Image
              src={selectedProduct.imageProduct}
              alt={selectedProduct.nameProduct}
              width={100}
              height={100}
              preview={false}
            />
            <div>
              <strong>Sản phẩm:</strong> {selectedProduct.nameProduct}
            </div>
            <div>
              <strong>Đánh giá:</strong>{" "}
              <Rate disabled defaultValue={selectedProduct.rating || 0} />
            </div>
            <div>
              <strong>Nhận xét:</strong>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  marginTop: "4px",
                }}
              >
                {selectedProduct.comment || "Không có nhận xét"}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductReviewModal;

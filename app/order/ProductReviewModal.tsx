"use client";

import React, { useEffect, useState, SetStateAction } from "react";
import { Modal, Button, Image, Input, Rate, Form } from "antd";
import { toast } from "react-toastify";
import { createNewReviewApi, updateReviewApi } from "../util/api";
import { useRouter } from "next/navigation";

type OrderItem = {
  product_id: number;
  product_name: string;
  image: string;
  quantity: number;
  price: number;
  reviewed: boolean;
  review?: Review;
};

type Review = {
  id: number;
  rating: number;
  comment: string;
  images: { id: number; url: string }[];
};

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  shipping_fee: number;
  created_at: string;
  status: string;
  order_items: OrderItem[];
  image_url?: string;
  note?: string;
  total_price: number;
  order_code: string;
}

type Props = {
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  orderItem: OrderItem[] | null;
  setOrders: React.Dispatch<SetStateAction<Order[]>>;
};

const ProductReviewModal = ({
  openReview,
  setOpenReview,
  orderItem,
  setOrders,
}: Props) => {
  const [products, setProducts] = useState<OrderItem[]>([]);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(
    null
  );
  const [form] = Form.useForm();
  const router = useRouter();
  const [existingImages, setExistingImages] = useState<
    { id: number; url: string }[]
  >([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  useEffect(() => {
    if (orderItem && orderItem.length > 0) {
      setProducts(orderItem);
    }
  }, [orderItem]);

  const showRatingModal = (product: OrderItem) => {
    setSelectedOrderItem(product);
    setOpenRatingModal(true);
    form.setFieldsValue({
      comment: product?.review?.comment || "",
      rating: product?.review?.rating || 0,
    });
    setExistingImages(product?.review?.images || []);
    setNewImages([]);
    setRemovedImageIds([]);
  };

  const handleCreateReview = async (values: {
    comment: string;
    rating: number;
  }) => {
    if (!selectedOrderItem) return;
    const totalImages = existingImages.length + newImages.length;
    if (totalImages > 5) {
      toast.error("Tổng số ảnh không được vượt quá 5");
      return;
    }

    const res = await createNewReviewApi(
      selectedOrderItem.product_id,
      values.rating,
      values.comment,
      newImages
    );
    if (res.detail) {
      toast.error("Lỗi hệ thống");
      return;
    }

    const updatedReview: Review = {
      id: Date.now(),
      rating: values.rating,
      comment: values.comment,
      images: [
        ...existingImages,
        ...newImages.map((file, index) => ({
          id: Date.now() + index,
          url: URL.createObjectURL(file),
        })),
      ],
    };

    console.log(updatedReview, newImages);

    const updatedProducts = products.map((p) =>
      p.product_id === selectedOrderItem.product_id
        ? { ...p, reviewed: true, review: updatedReview }
        : p
    );
    setProducts(updatedProducts);
    setOrders((prev) =>
      prev.map((order) => ({
        ...order,
        order_items: order.order_items.map((item) =>
          item.product_id === selectedOrderItem.product_id
            ? { ...item, reviewed: true, review: updatedReview }
            : item
        ),
      }))
    );
    toast.success("Đã thêm đánh giá!");
    router.refresh();
    setOpenRatingModal(false);
  };

  const handleUpdateReview = async (values: {
    comment: string;
    rating: number;
  }) => {
    if (!selectedOrderItem || !selectedOrderItem.review) return;
    const totalImages = existingImages.length + newImages.length;
    if (totalImages > 5) {
      toast.error("Tổng số ảnh không được vượt quá 5");
      return;
    }

    const res = await updateReviewApi(
      selectedOrderItem.review.id,
      values.rating,
      values.comment,
      `[${removedImageIds.toString()}]`,
      newImages
    );
    if (res.detail) {
      toast.error("Lỗi hệ thống");
      return;
    }

    const updatedReview: Review = {
      ...selectedOrderItem.review,
      rating: values.rating,
      comment: values.comment,
      images: [
        ...existingImages,
        ...newImages.map((file, index) => ({
          id: Date.now() + index,
          url: URL.createObjectURL(file),
        })),
      ],
    };

    const updatedProducts = products.map((p) =>
      p.product_id === selectedOrderItem.product_id
        ? { ...p, reviewed: true, review: updatedReview }
        : p
    );
    setProducts(updatedProducts);
    setOrders((prev) =>
      prev.map((order) => ({
        ...order,
        order_items: order.order_items.map((item) =>
          item.product_id === selectedOrderItem.product_id
            ? { ...item, reviewed: true, review: updatedReview }
            : item
        ),
      }))
    );
    toast.success("Đã cập nhật đánh giá!");
    router.refresh();
    setOpenRatingModal(false);
  };

  const showDetailModal = (order: OrderItem) => {
    setSelectedOrderItem(order);
    setOpenDetailModal(true);
  };

  return (
    <>
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
              key={product.product_id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <Image
                src={product.image}
                alt={product.image}
                width={100}
                height={100}
                preview={false}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {product.product_name}
                </div>
                <div style={{ color: product.reviewed ? "green" : "red" }}>
                  {product.reviewed ? "Đã đánh giá" : "Chưa đánh giá"}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {product.reviewed ? (
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

      <Modal
        open={openRatingModal}
        title={
          selectedOrderItem?.reviewed
            ? "Sửa đánh giá sản phẩm: " + selectedOrderItem.product_name
            : "Đánh giá sản phẩm: " + selectedOrderItem?.product_name
        }
        onCancel={() => setOpenRatingModal(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (selectedOrderItem?.reviewed) {
              handleUpdateReview(values);
            } else {
              handleCreateReview(values);
            }
          }}
        >
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

          <div>
            <p>
              <strong>Ảnh đánh giá (tối đa 5)</strong>
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {existingImages.map((img) => (
                <div key={img.id} style={{ position: "relative" }}>
                  <Image src={img.url} width={80} height={80} />
                  <Button
                    danger
                    size="small"
                    style={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => {
                      setExistingImages((prev) =>
                        prev.filter((i) => i.id !== img.id)
                      );
                      setRemovedImageIds((prev) => [...prev, img.id]);
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
              {newImages.map((file, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <Image
                    src={URL.createObjectURL(file)}
                    width={80}
                    height={80}
                    alt="preview"
                  />
                  <Button
                    danger
                    size="small"
                    style={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() =>
                      setNewImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
            {existingImages.length + newImages.length < 5 && (
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (
                    existingImages.length + newImages.length + files.length >
                    5
                  ) {
                    toast.warning("Tổng ảnh không được vượt quá 5");
                    return;
                  }
                  setNewImages((prev) => [...prev, ...files]);
                }}
              />
            )}
          </div>
        </Form>
      </Modal>

      <Modal
        open={openDetailModal}
        title={`Chi tiết đánh giá sản phẩm: ${selectedOrderItem?.product_name}`}
        footer={null}
        onCancel={() => setOpenDetailModal(false)}
      >
        {selectedOrderItem && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {selectedOrderItem?.review?.images.map((image, i) => (
              <Image
                key={i}
                src={image.url}
                alt=""
                width={100}
                height={100}
                preview={false}
              />
            ))}
            <div>
              <strong>Sản phẩm:</strong> {selectedOrderItem.product_name}
            </div>
            <div>
              <strong>Đánh giá:</strong>{" "}
              <Rate
                disabled
                defaultValue={selectedOrderItem?.review?.rating || 0}
              />
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
                {selectedOrderItem?.review?.comment || "Không có nhận xét"}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductReviewModal;

"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Layout, Typography, Table, Button, Modal, Tag, Image } from "antd";
import ProductReviewModal from "./ProductReviewModal";
import {
  changeStatusOrderApi,
  getAllOrderUser,
  getAllReviewForOrder,
} from "../util/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CatLoader from "../loading/CatLoader";
import type { Breakpoint } from "antd/es/_util/responsiveObserver";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

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
  image_urls?: string[];
  note?: string;
  total_price: number;
  order_code: string;
}

interface OrderDetail {
  id: number;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  shipping_fee: number;
  created_at: string;
  status: string;
  items: OrderItem[];
  image_urls?: string[];
  note?: string;
  total_price: number;
  order_code: string;
}

function formatCurrency(number: number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

const Orders: NextPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllOrderUser()) as any;
      console.log(res);
      if (!res.message) {
        setOrders(res);
      } else {
        toast.info("Hãy đăng nhập để xem danh sách đơn hàng");
        router.push("/login");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleOpen = async (order: Order) => {
    const res = (await getAllReviewForOrder(order.id)) as any;
    console.log(res);
    if (!res.detail) {
      setSelectedOrder(res.order);
    } else {
      toast.error("Lỗi hệ thống");
    }
    console.log(selectedOrder?.items);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenReview = () => {
    setOpenReview(true);
    setOpen(false);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    const res = await changeStatusOrderApi(selectedOrder?.id, "cancelled");
    if (!res) {
      toast.error("Có lỗi thử lại sau");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: "cancelled" } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder((prev) =>
      prev ? { ...prev, status: "cancelled" } : null
    );
    toast.success(`Cập nhật trạng thái sang cancelled thành công`);
  };

  const getStatusTag = (status: string) => {
    let color = "default";
    if (status === "completed") color = "green";
    else if (status === "shipping") color = "blue";
    else if (status === "pending") color = "orange";
    else if (status === "cancelled") color = "red";
    return <Tag color={color}>{status}</Tag>;
  };

  const columns: {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (value: any, record?: Order, index?: number) => React.ReactNode;
    responsive?: Breakpoint[];
  }[] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order_code",
      key: "order_code",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
      responsive: ["md"],
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: Order, record?: Order) => (
        <Button onClick={() => record && handleOpen(record)}>
          Xem chi tiết
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  return (
    <Layout
      className="container"
      style={{ padding: "24px", margin: "20px auto" }}
    >
      {isLoading ? (
        <CatLoader />
      ) : (
        <Content>
          <Title level={3}>Danh sách đơn hàng</Title>
          <Table
            style={{ marginTop: 24 }}
            dataSource={orders}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />

          <Modal
            title="Chi tiết đơn hàng"
            open={open}
            onCancel={handleClose}
            footer={[
              <Button key="close" onClick={handleClose}>
                Đóng
              </Button>,
            ]}
            width={800}
          >
            {selectedOrder && (
              <>
                <Paragraph>
                  <Text strong>Mã đơn hàng:</Text> {selectedOrder.order_code}
                </Paragraph>
                <Paragraph>
                  <Text strong>Khách hàng:</Text> {selectedOrder.customer_name}
                </Paragraph>
                <Paragraph>
                  <Text strong>Số điện thoại:</Text>{" "}
                  {selectedOrder.customer_phone}
                </Paragraph>
                <Paragraph>
                  <Text strong>Địa chỉ:</Text> {selectedOrder.shipping_address}
                </Paragraph>
                <Paragraph>
                  <Text strong>Ngày đặt:</Text> {selectedOrder.created_at}
                </Paragraph>
                <Paragraph>
                  <Text strong>Trạng thái:</Text> {selectedOrder.status}
                </Paragraph>
                <Paragraph>
                  <Text strong>Phí Ship:</Text> {selectedOrder.shipping_fee} ₫
                </Paragraph>
                <Paragraph>
                  <Text strong>Size:</Text>
                  <br />
                  {selectedOrder.image_urls &&
                  selectedOrder.image_urls.length > 0 ? (
                    selectedOrder.image_urls.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        alt="size"
                        style={{
                          maxWidth: 150,
                          maxHeight: 150,
                          padding: 10,
                          objectFit: "cover",
                        }}
                      />
                    ))
                  ) : (
                    <span>Không có ảnh size</span>
                  )}
                </Paragraph>
                <Paragraph>
                  <Text strong>Note:</Text>{" "}
                  {selectedOrder.note ? selectedOrder.note : "Trống"}
                </Paragraph>

                <Table
                  dataSource={selectedOrder.items.map((item, index) => ({
                    ...item,
                    key: index,
                    total: item.price * item.quantity,
                  }))}
                  columns={[
                    {
                      title: "Tên sản phẩm",
                      dataIndex: "product_name",
                      key: "product_name",
                    },
                    {
                      title: "Ảnh",
                      dataIndex: "image",
                      key: "image",
                      render: (src) => (
                        <Image src={src} width={80} height={80} alt="" />
                      ),
                    },
                    {
                      title: "Số lượng",
                      dataIndex: "quantity",
                      key: "quantity",
                    },
                    {
                      title: "Giá",
                      dataIndex: "price",
                      key: "price",
                      render: formatCurrency,
                    },
                    {
                      title: "Thành tiền",
                      dataIndex: "total",
                      key: "total",
                      render: formatCurrency,
                    },
                  ]}
                  pagination={false}
                  style={{ marginTop: 24 }}
                  size="small"
                  footer={() => (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "end",
                        paddingRight: 30,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <strong>Tổng cộng: </strong>
                      <strong>
                        {formatCurrency(
                          selectedOrder.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                        )}
                      </strong>
                    </div>
                  )}
                />

                {selectedOrder.status === "pending" && (
                  <Button
                    danger
                    style={{ marginTop: 16 }}
                    onClick={handleCancelOrder}
                  >
                    Hủy đơn
                  </Button>
                )}
                {selectedOrder.status === "completed" && (
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    onClick={() => handleOpenReview()}
                  >
                    Đánh giá
                  </Button>
                )}
              </>
            )}
          </Modal>
          <ProductReviewModal
            openReview={openReview}
            setOpenReview={setOpenReview}
            orderItem={selectedOrder?.items || []}
            setOrders={setOrders}
          />
        </Content>
      )}
    </Layout>
  );
};

export default Orders;

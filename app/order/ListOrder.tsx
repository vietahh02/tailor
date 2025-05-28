"use client";

import { useState } from "react";
import type { NextPage } from "next";
import {
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  Tag,
  Pagination,
} from "antd";
import Image from "next/image";
import n1 from "../assets/images/nailbox2.png";
import ProductReviewModal from "./ModalListProductOrdered";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  key: string;
  id: string;
  customer: string;
  phone: string;
  address: string;
  date: string;
  status: string;
  items: OrderItem[];
  size?: string;
  note?: string;
}

const orders: Order[] = [
  {
    key: "1",
    id: "ORD001",
    customer: "Nguyen Van A",
    phone: "0909123456",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    date: "2025-05-20",
    status: "Đang xử lý",
    items: [
      { name: "Sách Lập trình Java", quantity: 1, price: 250000 },
      { name: "Chuột không dây", quantity: 2, price: 300000 },
    ],
    size: n1.blurDataURL,
  },
  {
    key: "2",
    id: "ORD002",
    customer: "Tran Thi B",
    phone: "0912345678",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    date: "2025-05-18",
    status: "Đã giao",
    items: [{ name: "Bàn phím cơ", quantity: 1, price: 1200000 }],
    size: n1.blurDataURL,
  },
  {
    key: "3",
    id: "ORD003",
    customer: "Le Van C",
    phone: "0988765432",
    address: "789 Đường MNO, Quận 5, TP.HCM",
    date: "2025-05-19",
    status: "Đang giao",
    items: [
      { name: "Tai nghe Bluetooth", quantity: 1, price: 500000 },
      { name: "USB 16GB", quantity: 3, price: 150000 },
    ],
    size: n1.blurDataURL,
  },
];

function formatCurrency(number: number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

const Orders: NextPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
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

  const getStatusTag = (status: string) => {
    let color = "default";
    if (status === "Đã giao") color = "green";
    else if (status === "Đang giao") color = "blue";
    else if (status === "Đang xử lý") color = "orange";
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Ngày đặt", dataIndex: "date", key: "date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: Order, record: Order) => (
        <Button onClick={() => handleOpen(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <Layout
      className="container"
      style={{ padding: "24px", margin: "20px auto" }}
    >
      <Content>
        <Title level={3}>Danh sách đơn hàng</Title>
        <Table
          style={{ marginTop: 24 }}
          dataSource={orders}
          columns={columns}
          pagination={false}
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
                <Text strong>Mã đơn hàng:</Text> {selectedOrder.id}
              </Paragraph>
              <Paragraph>
                <Text strong>Khách hàng:</Text> {selectedOrder.customer}
              </Paragraph>
              <Paragraph>
                <Text strong>Số điện thoại:</Text> {selectedOrder.phone}
              </Paragraph>
              <Paragraph>
                <Text strong>Địa chỉ:</Text> {selectedOrder.address}
              </Paragraph>
              <Paragraph>
                <Text strong>Ngày đặt:</Text> {selectedOrder.date}
              </Paragraph>
              <Paragraph>
                <Text strong>Trạng thái:</Text> {selectedOrder.status}
              </Paragraph>
              <Paragraph>
                <Text strong>Size:</Text>
                <br />
                <Image
                  src={n1}
                  alt="size"
                  style={{ maxWidth: 500, maxHeight: 300, padding: 10 }}
                />
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
                    dataIndex: "name",
                    key: "name",
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
                  <strong>
                    Tổng cộng:{" "}
                    {formatCurrency(
                      selectedOrder.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                    )}
                  </strong>
                )}
              />

              {selectedOrder.status === "Đang xử lý" && (
                <Button danger style={{ marginTop: 16 }}>
                  Hủy đơn
                </Button>
              )}
              {selectedOrder.status === "Đã giao" && (
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
        />
        <Pagination
          className="mt-4"
          align="center"
          defaultCurrent={1}
          total={50}
        />
      </Content>
    </Layout>
  );
};

export default Orders;

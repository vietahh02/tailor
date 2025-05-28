"use client";

import { Table, Button, Modal, Tag, Image, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

type Product = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderStatus = "pending" | "shipping" | "completed" | "cancelled";

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderDate: string;
  status: OrderStatus;
  sizeImage: string;
  note: string;
  products: Product[];
};

const sampleData: Order[] = [
  {
    id: "O001",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, TP.HCM",
    orderDate: "2024-05-20",
    status: "pending",
    sizeImage: "/images/size1.png",
    note: "Giao hàng sau 18h",
    products: [
      {
        name: "Áo thun",
        quantity: 2,
        price: 150000,
        image: "/images/product1.jpg",
      },
      {
        name: "Quần jeans",
        quantity: 1,
        price: 350000,
        image: "/images/product2.jpg",
      },
    ],
  },
  {
    id: "O001",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, TP.HCM",
    orderDate: "2024-05-20",
    status: "shipping",
    sizeImage: "/images/size1.png",
    note: "Giao hàng sau 18h",
    products: [
      {
        name: "Áo thun",
        quantity: 2,
        price: 150000,
        image: "/images/product1.jpg",
      },
      {
        name: "Quần jeans",
        quantity: 1,
        price: 350000,
        image: "/images/product2.jpg",
      },
    ],
  },
  {
    id: "O001",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, TP.HCM",
    orderDate: "2024-05-20",
    status: "completed",
    sizeImage: "/images/size1.png",
    note: "Giao hàng sau 18h",
    products: [
      {
        name: "Áo thun",
        quantity: 2,
        price: 150000,
        image: "/images/product1.jpg",
      },
      {
        name: "Quần jeans",
        quantity: 1,
        price: 350000,
        image: "/images/product2.jpg",
      },
    ],
  },
  {
    id: "O001",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, TP.HCM",
    orderDate: "2024-05-20",
    status: "cancelled",
    sizeImage: "/images/size1.png",
    note: "Giao hàng sau 18h",
    products: [
      {
        name: "Áo thun",
        quantity: 2,
        price: 150000,
        image: "/images/product1.jpg",
      },
      {
        name: "Quần jeans",
        quantity: 1,
        price: 350000,
        image: "/images/product2.jpg",
      },
    ],
  },
];

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(sampleData);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewDetail = (record: Order) => {
    setSelectedOrder(record);
    setModalVisible(true);
  };

  const updateOrderStatus = (newStatus: OrderStatus) => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    message.success(`Cập nhật trạng thái sang "${newStatus}" thành công`);
  };

  const calculateTotal = (products: Product[]) =>
    products.reduce((total, p) => total + p.quantity * p.price, 0);

  const columns: ColumnsType<Order> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "customerName", key: "customerName" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { title: "Ngày đặt", dataIndex: "orderDate", key: "orderDate" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => {
        const color =
          status === "pending"
            ? "gold"
            : status === "shipping"
            ? "blue"
            : status === "completed"
            ? "green"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey="id" />

      <Modal
        title="Chi tiết đơn hàng"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          selectedOrder?.status === "pending" && (
            <Button
              key="confirm-processing"
              type="primary"
              onClick={() => updateOrderStatus("shipping")}
            >
              Xác nhận xử lý
            </Button>
          ),
          selectedOrder?.status === "shipping" && (
            <Button
              key="confirm-completed"
              type="primary"
              onClick={() => updateOrderStatus("completed")}
            >
              Đã giao hàng
            </Button>
          ),
          selectedOrder?.status !== "completed" &&
            selectedOrder?.status !== "cancelled" && (
              <Button
                key="cancel-order"
                danger
                onClick={() => updateOrderStatus("cancelled")}
              >
                Hủy đơn
              </Button>
            ),
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Tên khách hàng:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>SĐT:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Ngày đặt:</strong> {selectedOrder.orderDate}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Ghi chú:</strong> {selectedOrder.note}
            </p>
            <p>
              <strong>Hình ảnh size:</strong>
            </p>
            <Image src={selectedOrder.sizeImage} alt="Size" width={150} />

            <p>
              <strong>Sản phẩm:</strong>
            </p>
            <Table
              dataSource={selectedOrder.products}
              pagination={false}
              rowKey={(record) => record.name}
              columns={[
                { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
                {
                  title: "Ảnh",
                  dataIndex: "image",
                  key: "image",
                  render: (src) => <Image src={src} width={80} />,
                },
                { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
                {
                  title: "Giá (VNĐ)",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => price.toLocaleString(),
                },
                {
                  title: "Tổng",
                  key: "total",
                  render: (_, record: Product) =>
                    (record.price * record.quantity).toLocaleString(),
                },
              ]}
            />

            <p style={{ marginTop: 16 }}>
              <strong>Tổng đơn hàng:</strong>{" "}
              {calculateTotal(selectedOrder.products).toLocaleString()} VNĐ
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderTable;

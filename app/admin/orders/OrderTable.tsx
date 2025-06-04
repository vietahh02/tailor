"use client";

import { changeStatusOrderApi } from "@/app/util/api";
import { getAllOrderForAdmin } from "@/app/util/apiAdmin";
import { Table, Button, Modal, Tag, Image, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type OrderStatus = "pending" | "shipping" | "completed" | "cancelled";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  id: number;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  shipping_fee: number;
  created_at: string;
  status: string;
  items: OrderItem[];
  image_url?: string;
  note?: string;
  total_price: number;
  order_code: string;
};

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllOrderForAdmin()) as any;
      console.log(res);
      if (!res.detail) {
        setOrders(res);
      } else {
        toast.info("Hãy đăng nhập để xem danh sách đơn hàng");
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  const handleViewDetail = (record: Order) => {
    setSelectedOrder(record);
    setModalVisible(true);
  };

  const updateOrderStatus = async (idOrder: number, newStatus: OrderStatus) => {
    if (!selectedOrder) return;

    const res = await changeStatusOrderApi(idOrder, newStatus);
    if (!res) {
      toast.error("Có lỗi thử lại sau");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    toast.success(`Cập nhật trạng thái sang "${newStatus}" thành công`);
  };

  const columns: ColumnsType<Order> = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    { title: "SĐT", dataIndex: "customer_phone", key: "customer_phone" },
    { title: "Ngày đặt", dataIndex: "created_at", key: "created_at" },
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
  function formatCurrency(number: number) {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

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
              onClick={() =>
                selectedOrder && updateOrderStatus(selectedOrder.id, "shipping")
              }
            >
              Xác nhận xử lý
            </Button>
          ),
          selectedOrder?.status === "shipping" && (
            <Button
              key="confirm-completed"
              type="primary"
              onClick={() =>
                selectedOrder &&
                updateOrderStatus(selectedOrder.id, "completed")
              }
            >
              Đã giao hàng
            </Button>
          ),
          selectedOrder?.status !== "completed" &&
            selectedOrder?.status !== "cancelled" && (
              <Button
                key="cancel-order"
                danger
                onClick={() =>
                  selectedOrder &&
                  updateOrderStatus(selectedOrder.id, "cancelled")
                }
              >
                Hủy đơn
              </Button>
            ),
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Tên khách hàng:</strong> {selectedOrder.customer_name}
            </p>
            <p>
              <strong>SĐT:</strong> {selectedOrder.customer_phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder.shipping_address}
            </p>
            <p>
              <strong>Ngày đặt:</strong> {selectedOrder.created_at}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Phí Ship:</strong> {selectedOrder.shipping_fee || 0} ₫
            </p>
            <p>
              <strong>Ghi chú:</strong> {selectedOrder.note}
            </p>
            <p>
              <strong>Hình ảnh size:</strong>
            </p>
            <Image src={selectedOrder.image_url} alt="Size" width={150} />

            <p>
              <strong>Sản phẩm:</strong>
            </p>
            <Table
              dataSource={selectedOrder.items}
              pagination={false}
              rowKey={(record) => record.name}
              columns={[
                { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
                {
                  title: "Ảnh",
                  dataIndex: "image",
                  key: "image",
                  render: (src) => (
                    <Image src={src} width={80} height={80} alt="" />
                  ),
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
                  render: (_, record: OrderItem) =>
                    (record.price * record.quantity).toLocaleString(),
                },
              ]}
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
                      selectedOrder?.items?.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      ) || 0
                    )}
                  </strong>
                </div>
              )}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderTable;

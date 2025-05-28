// components/ProductTable.tsx

"use client";

import React, { useState } from "react";
import { Table, Button, Image, Space, message } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddProductModal from "./NewProductModal";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description?: string;
  discount?: number;
  categories?: string[];
}

export interface ProductFormValues {
  name: string;
  price: number;
  discount: number;
  description: string;
  categories: string[];
  images: File[];
}

const initialData: Product[] = [
  {
    id: 1,
    name: "Sản phẩm A",
    price: 100000,
    discount: 45,
    images: [
      "https://file.hstatic.net/200000201143/article/nail-co-nep_6358360d5e664b3ea8860922d116322b_1024x1024.jpg",
    ],
  },
  {
    id: 2,
    name: "Sản phẩm B",
    price: 200000,
    images: [
      "https://file.hstatic.net/200000201143/article/nail-co-nep_6358360d5e664b3ea8860922d116322b_1024x1024.jpg",
    ],
  },
];

const ProductTable = () => {
  const [data, setData] = useState<Product[]>(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewVisible, setIsViewVisible] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditModalVisible(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewVisible(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
    message.success("Cập nhật sản phẩm thành công!");
    setEditModalVisible(false);
    setEditingProduct(null);
  };

  const handleAddProduct = (values: ProductFormValues) => {
    console.log("Giá trị sản phẩm:", values);
    message.success("Thêm sản phẩm thành công!");
    setOpenModal(false);
  };

  const handleDelete = (record: Product) => {
    setData((prev) => prev.filter((p) => p.id !== record.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (images: string[]) => (
        <Image src={images[0]} width={100} height={80} alt="3" />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Hành động",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      <AddProductModal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddProduct}
      />
      <EditProductModal
        visible={editModalVisible}
        product={editingProduct}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={handleUpdateProduct}
      />
      <ViewProductModal
        visible={isViewVisible}
        product={selectedProduct}
        onClose={() => setIsViewVisible(false)}
      />
    </>
  );
};

export default ProductTable;

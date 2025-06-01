// components/ProductTable.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Image, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddProductModal from "./NewProductModal";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";
import {
  createProduct,
  deleteProduct,
  updateProductApi,
} from "@/app/util/apiAdmin";
import { toast } from "react-toastify";
import { getAllProduct } from "@/app/util/api";
import ConfirmModal from "@/app/common/ConfirmModal";

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

interface ProductForEdit {
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
}

export interface ProductFormValues {
  name: string;
  price: number;
  images: File[];
  description?: string;
  discount?: number;
  category: string[];
  job?: string[];
  pattern?: string[];
  nail_length?: string;
  purpose?: string[];
  occasion?: string[];
}

const ProductTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const idDelete = useRef(-1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct();
      setData(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editModalVisible) return;
    setEditingProduct(null);
  }, [editModalVisible]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditModalVisible(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewVisible(true);
  };

  const handleUpdateProduct = async (product: ProductForEdit) => {
    const res = await updateProductApi(
      product.id,
      product.name,
      product.price,
      product.category.toString(),
      product.description,
      product.discount,
      product.images,
      product.job?.toString(),
      product.pattern?.toString(),
      product.nail_length,
      product.purpose?.toString(),
      product.occasion?.toString(),
      `[${product.delete_image_ids?.toString()}]`
    );

    if (res.message === "successful") {
      setData((prev) => {
        return prev.map((p) => {
          if (p.id === res.data.id) return res.data;
          return p;
        });
      });
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      toast.error("Cập nhật thất bại");
      console.log(res);
    }
    setEditModalVisible(false);
    setEditingProduct(null);
  };

  const handleAddProduct = async (values: ProductFormValues) => {
    console.log("Giá trị sản phẩm:", values);
    console.log(values.images);

    const res = await createProduct(
      values.name,
      values.price,
      values.category.toString(),
      values.description,
      values.discount,
      values.images,
      values.job?.toString(),
      values.pattern?.toString(),
      values.nail_length,
      values.purpose?.toString(),
      values.occasion?.toString()
    );
    console.log(res);
    const response = await getAllProduct();
    setData(response);
    toast.success("Thêm sản phẩm thành công!");

    setOpenModal(false);
  };

  const handleDelete = async () => {
    const res = await deleteProduct(idDelete.current);
    if (res.message === "successful") {
      toast.success("Xóa thành công sản phẩm");
      setData((prev) => prev.filter((p) => p.id !== idDelete.current));
    } else {
      toast.error("Xóa không thành công");
    }
    setOpenConfirm(false);
    idDelete.current = -1;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (images?: string[]) =>
        images && images.length > 0 ? (
          <Image src={images[0]?.url} width={100} height={80} alt="3" />
        ) : (
          <span>Không có ảnh</span>
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
      render: (_: unknown, record: Product) => (
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
            onClick={() => {
              setOpenConfirm(true);
              idDelete.current = record.id;
            }}
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
      {editingProduct && (
        <EditProductModal
          visible={editModalVisible}
          product={editingProduct}
          onCancel={() => setEditModalVisible(false)}
          onSubmit={handleUpdateProduct}
        />
      )}
      <ViewProductModal
        visible={isViewVisible}
        product={selectedProduct}
        onClose={() => setIsViewVisible(false)}
      />
      <ConfirmModal
        open={openConfirm}
        title="Xác nhận xóa sản phẩm"
        onCancel={() => {
          setOpenConfirm(false);
          idDelete.current = -1;
        }}
        onConfirm={() => handleDelete()}
      ></ConfirmModal>
    </>
  );
};

export default ProductTable;

"use client";

import React, { useEffect } from "react";
import { Table, Button, Image, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { deleteDesignApi, getAllDesignApi } from "../util/api";
import { toast } from "react-toastify";
import ConfirmModal from "../common/ConfirmModal";

type Charm = {
  id: number;
  charm: number;
  name: string;
  x: number;
  y: number;
  zIndex: number;
  deg: number;
};

type Design = {
  id: number;
  name: string;
  background: number;
  preview: string;
  listCharm: Charm[];
};

const NailDesignTable: React.FC = () => {
  const [designs, setDesigns] = React.useState<Design[]>([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [id, setId] = React.useState<number>(-1);
  const [name, setName] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchDesigns = async () => {
      const response = (await getAllDesignApi()) as any;
      if (response.message) {
        toast.info(
          "Hãy đăng nhập để bắt đầu tạo những bảng thiết kế cho riêng mình"
        );
        router.push("/login");
        return;
      }
      setDesigns(response);
    };
    fetchDesigns();
  }, []);

  const handleCreateNew = () => {
    router.push("/designs/new");
  };

  const handleTryOn = (record: Design) => {
    toast.info(`Đang thử thiết kế: ${record.name}`);
  };

  const handleEdit = (record: Design) => {
    // console.log(record);
    router.push(`/designs/edit/${record.id}`);
  };

  const handleDelete = async (id: number) => {
    const res = (await deleteDesignApi(id)) as any;
    if (res.message === "Design deleted successfully") {
      toast.success("Xoá thiết kế thành công");
      setDesigns((prev) => prev.filter((design) => design.id !== id));
    } else {
      toast.error("Xoá thiết kế thất bại vui lòng thử lại sau");
    }
    setOpenConfirm(false);
    setId(-1);
    setName("");
  };

  const handleClickDelete = (id: number, name: string) => {
    setId(id);
    setName(name);
    setOpenConfirm(true);
  };

  const handleCopy = async (imageUrl: string) => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      toast.success("Đã copy link ảnh vào clipboard!");
    } catch (err) {
      toast.error("Copy thất bại!");
    }
  };

  const columns: ColumnsType<Design> = [
    {
      title: "STT",
      // dataIndex: "id",
      key: "index",
      render: (_text, _record, index) => index + 1,
      width: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "preview",
      key: "preview",
      render: (url: string) => <Image src={url} width={80} />,
      width: "20%",
    },
    {
      title: "Tên thiết kế",
      dataIndex: "name",
      key: "name",
      width: "30%",
      responsive: ["md"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Button type="primary" onClick={() => handleTryOn(record)}>
            Try On
          </Button>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button
            danger
            onClick={() => handleClickDelete(record.id, record.name)}
          >
            Xóa
          </Button>
          <Button onClick={() => handleCopy(record.preview)}>Copy</Button>
        </Space>
      ),
      width: "40%",
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleCreateNew}
        style={{ marginBottom: 16 }}
      >
        + Tạo mới
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={designs}
        pagination={{ pageSize: 8 }}
      />

      <ConfirmModal
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => handleDelete(id)}
        content={`Bạn có chắc chắn muốn xoá thiết kế "${name}" không?`}
      />
    </div>
  );
};

export default NailDesignTable;

"use client";

import React from "react";
import { Table, Button, Image, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

interface NailDesign {
  id: number;
  image: string;
  name: string;
}

const mockData: NailDesign[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/80x80.png?text=Nail+1",
    name: "Thiết kế hoa văn mùa hè",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80x80.png?text=Nail+2",
    name: "Thiết kế đơn giản sang trọng",
  },
];

const NailDesignTable: React.FC = () => {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push("/design/new");
  };

  const handleTryOn = (record: NailDesign) => {
    console.log("Try on:", record);
  };

  const handleEdit = (record: NailDesign) => {
    console.log(record);
    router.push("/design/new");
  };

  const columns: ColumnsType<NailDesign> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (url: string) => <Image src={url} width={80} />,
      width: "20%",
    },
    {
      title: "Tên thiết kế",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleTryOn(record)}>
            Try On
          </Button>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        </Space>
      ),
      width: "30%",
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
        dataSource={mockData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default NailDesignTable;

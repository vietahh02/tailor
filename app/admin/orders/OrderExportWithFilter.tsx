// components/ExportOrdersWithFilter.tsx
"use client";

import React, { useState } from "react";
import { Button, DatePicker, Space, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { exportOrdersToExcel } from "../../util/exportToExcel";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  id: number;
  customer_name: string;
  shipping_address: string;
  created_at: string;
  status: string;
  items: OrderItem[];
  note?: string;
  total_amount: number;
};

type Props = {
  orders: Order[];
};

const ExportOrdersWithFilter = ({ orders }: Props) => {
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const handleExport = () => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      message.warning("Vui lòng chọn khoảng ngày");
      return;
    }

    const [from, to] = dateRange;

    const filtered = orders.filter((order) => {
      const orderDate = dayjs(order.created_at);
      return (
        orderDate.isSameOrAfter(from, "day") &&
        orderDate.isSameOrBefore(to, "day")
      );
    });

    if (filtered.length === 0) {
      message.info("Không có đơn hàng nào trong khoảng thời gian này");
      return;
    }

    exportOrdersToExcel(
      filtered,
      `DonHang_${from.format("YYYYMMDD")}_${to.format("YYYYMMDD")}.xlsx`
    );
  };

  return (
    <Space direction="horizontal">
      <RangePicker
        format="YYYY-MM-DD"
        onChange={(value) => setDateRange(value)}
      />
      <Button type="primary" onClick={handleExport}>
        Export Đơn Hàng
      </Button>
    </Space>
  );
};

export default ExportOrdersWithFilter;

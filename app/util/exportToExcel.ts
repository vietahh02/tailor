// utils/exportOrdersToExcel.ts
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

export const exportOrdersToExcel = async (
  orders: Order[],
  fileName = "orders.xlsx"
) => {
  if (!orders || orders.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Orders");

  // Set column headers
  worksheet.columns = [
    { header: "STT", key: "index", width: 6 },
    { header: "Tên khách hàng", key: "customer", width: 25 },
    { header: "Ngày đặt", key: "date", width: 25 },
    { header: "Tổng tiền", key: "total", width: 15 },
    { header: "Trạng thái", key: "status", width: 20 },
    { header: "Sản phẩm", key: "products", width: 20 },
  ];

  // Add header style
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFCC" },
    };
  });

  // Add order rows
  orders.forEach((order, idx) => {
    worksheet.addRow({
      index: idx + 1,
      customer: order.customer_name,
      date: order.created_at,
      total: order.total_amount,
      status: order.status,
      products: order.items.map((obj) => obj.name).join(", "),
    });
  });

  worksheet.getColumn("products").alignment = { wrapText: true };
  // Format date and currency
  worksheet.getColumn("date").numFmt = "yyyy-mm-dd";
  worksheet.getColumn("total").numFmt = '#,##0" ₫"';

  // Add total row
  const total = orders.reduce(
    (sum, o) => {
      if (o.status === "cancelled") return 0;
      return sum + o.total_amount;
    },

    0
  );
  const totalRow = worksheet.addRow({
    index: "",
    customer: "",
    date: "TỔNG CỘNG",
    total: total,
    status: "",
    products: "",
  });

  // Style total row
  totalRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true, color: { argb: "FF0000" } };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    if (colNumber === 4) {
      cell.numFmt = '#,##0" ₫"';
      cell.alignment = { horizontal: "right" };
    }
  });

  // Save as Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
};

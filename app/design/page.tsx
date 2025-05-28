import React from "react";
import NailDesignTable from "./NailDesignTable";

const Page = () => {
  return (
    <div>
      <div style={{ padding: 24 }}>
        <h1>Danh sách mẫu nail đã thiết kế</h1>
        <NailDesignTable />
      </div>
    </div>
  );
};

export default Page;

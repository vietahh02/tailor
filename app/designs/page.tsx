import React from "react";
import NailDesignTable from "./NailDesignTable";
import Header from "../common/header";
import Footer from "../common/footer";

const Page = () => {
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: 24 }}>
          <h1>Danh sách mẫu nail đã thiết kế</h1>
          <NailDesignTable />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;

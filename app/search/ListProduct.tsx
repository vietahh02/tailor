import React from "react";
import Product from "./Product";
import { Pagination } from "antd";

const ListProduct = () => {
  return (
    <div className="product_section ">
      <div className="container">
        <div className="row product_section_2 layout_padding">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Pagination
            className="mt-4"
            align="center"
            defaultCurrent={1}
            total={50}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

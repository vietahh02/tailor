import React from "react";
import Product from "../products/Product";
import { Pagination } from "antd";

const Favorite = () => {
  return (
    <div className="product_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="product_taital">Danh sách yêu thích</h1>
            <p className="product_text">
              💖 Nailbox siêu xinh cho nàng xinh – chỉ cần mở hộp là có ngay bộ
              móng lung linh ✨, xinh hết nấc! 💅
            </p>
          </div>
        </div>
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

export default Favorite;

import React from "react";
import Product from "./Product";

const ListProduct = () => {
  return (
    <div className="product_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="product_taital">Nail Box Xinh Yêu</h1>
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
          {/* <div className="seemore_bt">
            <a href="#">See More</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

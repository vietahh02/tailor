import Image from "next/image";

import React from "react";
import banner from "../../assets/images/banner3.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="carousel-item active">
      <div className="">
        <div className="row">
          <div className="col-sm-6">
            <h1 className="banner_taital">
              Tailor <br />
              Nail
            </h1>
            <p className="banner_text">
              TailorNail ra đời với mong muốn mang đến những bộ móng “may đo”
              dành riêng cho bạn, với thiết kế tinh tế, màu sắc và kiểu dáng do
              chính bạn lựa chọn.
            </p>
            <div className="read_bt">
              <Link href="/search">Ghé thăm</Link>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="banner_img">
              <Image
                src={banner}
                alt="Banner Image"
                // style={{ borderRadius: 20 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

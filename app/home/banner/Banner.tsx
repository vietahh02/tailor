import Image from "next/image";

import React from "react";
import banner from "../../assets/images/banner3.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="carousel-item active">
      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <h1 className="banner_taital">
              Tailor <br />
              Nail
            </h1>
            <p className="banner_text">
              Chúng tớ ở đây để ✨ Biến đôi tay xinh của bạn thành tác phẩm nghệ
              thuật với những hộp nailbox siêu xinh 💅 – chọn màu 🎨, mix kiểu
              💖, lung linh như ý muốn! 🌸
            </p>
            <div className="read_bt">
              <Link href="/">Ghé thăm</Link>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="banner_img">
              <Image src={banner} alt="Banner Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

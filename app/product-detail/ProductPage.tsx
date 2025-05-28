"use client";

import Image from "next/image";
import "./style-detail.css";

import n1 from "../assets/images/nailbox1.png";
import n2 from "../assets/images/nailbox2.png";
import n3 from "../assets/images/nailbox3.png";
import n4 from "../assets/images/nailbox4.png";
import Slider from "react-slick";
import { useState, ChangeEvent } from "react";
import Description from "./Description";
import FeedBack from "./FeedBack";

const ProductCard = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = parseInt(value, 10);

    if (!isNaN(number) && number > 0) {
      setQuantity(number);
    } else if (value === "") {
      setQuantity(1);
    }
  };

  const images = [n1, n2, n3, n4];

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <Image
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            width={60}
            height={60}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container p-3">
      <nav className="pd-breadcrumb">
        Home / <strong>Bộ Móng Giả Mẫu 189 | Hàng Handmade</strong>
      </nav>

      <div className="pd-product row">
        <div className="slider-container pd-image">
          <Slider {...settings}>
            <div>
              <Image src={n1} alt="" style={{ width: "100%" }} />
            </div>
            <div>
              <Image src={n2} alt="" style={{ width: "100%" }} />
            </div>
            <div>
              <Image src={n3} alt="" style={{ width: "100%" }} />
            </div>
            <div>
              <Image src={n4} alt="" style={{ width: "100%" }} />
            </div>
          </Slider>
        </div>
        <div className="pd-details ">
          <h1 className="pd-title">Bộ Móng Giả Mẫu 189 | Hàng Handmade</h1>
          <p className="pd-sku">SKU: #0189</p>
          <p className="pd-brand">NAILBOX</p>
          <p className="pd-price-old">240.000 ₫</p>
          <p className="pd-price-current">200.000 ₫</p>

          <div className="pd-quantity-add">
            <div className="pd-qty">
              <button onClick={handleDecrease}>-</button>
              <input
                type="text"
                value={quantity}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button onClick={handleIncrease}>+</button>
            </div>
            <button className="pd-add-to-cart">Add to cart</button>
            <button className="pd-try-on">Try On</button>
          </div>

          <p className="pd-category">
            Categories: <strong>Đính đá</strong>
          </p>

          <div className="pd-share">
            <Description />
          </div>
        </div>
      </div>

      <div className="pd-tabs">
        <span className="pd-tab">⭐ Đánh giá</span>
      </div>
      <FeedBack />
    </div>
  );
};

export default ProductCard;

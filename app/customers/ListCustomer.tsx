"use client";

import React, { useRef } from "react";
// import client from "../assets/images/client-img.png";
import cus1 from "../assets/images/cus1.png";
import cus2 from "../assets/images/cus2.png";
import cus3 from "../assets/images/cus3.png";
import cus4 from "../assets/images/cus4.png";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";

const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ListCustomer = () => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="customer_section">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="customer_taital">What says customers</h1>
          </div>
        </div>
        <div id="main_slider" className="carousel slide" data-ride="carousel">
          <Slider {...settings} ref={sliderRef}>
            <div className="carousel-item">
              <div className="client_section_2">
                <div className="client_main">
                  <div className="client_left">
                    <div className="client_img">
                      <Image src={cus1} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">VÂN ANH</h3>
                    <p className="dolor_text">
                      Nail xinh lắm nha!!!! Mọi người nên thử và trải nghiệm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="client_section_2">
                <div className="client_main">
                  <div className="client_left">
                    <div className="client_img">
                      <Image src={cus2} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">DIÊN VY</h3>
                    <p className="dolor_text">
                      Lần đầu tiên tự design móng trên web. Thích phết 😍
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="client_section_2">
                <div className="client_main">
                  <div className="client_left">
                    <div className="client_img">
                      <Image src={cus3} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">KHÁNH MY</h3>
                    <p className="dolor_text">
                      Mẫu shop đa dạng phù hợp nhiều sự kiện lắm nha. Mình chốt
                      liền 3 bộ luôn😁
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="client_section_2">
                <div className="client_main">
                  <div className="client_left">
                    <div className="client_img">
                      <Image src={cus4} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">DỊU THẢO</h3>
                    <p className="dolor_text">
                      Shop đóng gói cẩn thận lắm, ship hàng còn nhanh nữa. Cảm
                      ơn quà tặng của shop nha. Mình sẽ giới thiệu các bạn cùng
                      mua!!!!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          <button
            className="carousel-control-prev"
            data-slide="prev"
            onClick={previous}
          >
            <GrPrevious />
          </button>
          <button
            className="carousel-control-next"
            data-slide="next"
            onClick={next}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCustomer;

"use client";

import React, { useRef } from "react";
import client from "../assets/images/client-img.png";
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
    <div className="customer_section layout_padding">
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
                      <Image src={client} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">Jonyro</h3>
                    <p className="dolor_text">
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation eu{" "}
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
                      <Image src={client} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">Jonyro</h3>
                    <p className="dolor_text">
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation eu{" "}
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
                      <Image src={client} alt="Client Image" />
                    </div>
                  </div>
                  <div className="client_right">
                    <h3 className="name_text">Jonyro</h3>
                    <p className="dolor_text">
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation eu{" "}
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

import React from "react";
import Banner from "./Banner";

const ListBanner = () => {
  return (
    <div className="banner_section layout_padding layout_padding_bottom">
      <div
        id="carouselExampleIndicators "
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner container">
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default ListBanner;

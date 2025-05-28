import React from "react";
import Banner from "./Banner";

const ListBanner = () => {
  return (
    <div className="banner_section layout_padding">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default ListBanner;

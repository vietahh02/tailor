"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import nail from "../assets/images/nailbox1.png";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/product-detail");
  };

  return (
    <div className="col-lg-3 col-sm-6" onClick={() => handleRedirect()}>
      <div className="product_box">
        <h4 className="bursh_text">Name Nail</h4>
        <p className="lorem_text">Tuyệt phẩm nailbox xinh yêu</p>
        <Image src={nail} className="image_1" alt="Name Nail" />
        <div className="btn_main">
          <div className="buy_bt">
            <ul>
              <li>
                <Link href="#">Add to cart</Link>
              </li>
              <li className="active">
                <Link
                  href="#"
                  className="d-flex"
                  style={{ fontSize: "22px", gap: "5px" }}
                >
                  <FaRegHeart /> <FaHeart />
                </Link>
              </li>
            </ul>
          </div>
          <h3 className="price_text">$30</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;

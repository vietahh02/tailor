"use client";

import React from "react";
import im from "../../assets/images/new1.jpg";
import Image from "next/image";
// import Link from "next/link";
import { Button } from "antd";
import { toast } from "react-toastify";

const DesignNail = () => {
  const handleDesign = () => {
    toast.info("Chức năng đang trong thời gian nâng cấp hãy thử lại sau");
  };
  return (
    <div className="about_section layout_padding">
      <div className="container">
        <div className="about_section_main ">
          <div className="row">
            <div className="col-md-6">
              <div className="about_taital_main pl-0 pr-4">
                <h1 className="about_taital">design nail</h1>
                <p className="about_text">
                  TailorNail xin chào cả nhà! TailorNail là nền tảng giúp bạn
                  yêu thích làm nail có thể tự thiết kế, thử mẫu và đặt hàng
                  Nail Box ngay tại nhà với sự hỗ trợ từ công nghệ AI/AR. Chúng
                  mình biến đam mê làm đẹp thành trải nghiệm cá nhân hóa cho
                  từng bạn! 💖 TailorNail ra đời để mang đến những bộ móng “may
                  đo” chuẩn gu, giúp bạn tự tin thể hiện cá tính theo cách riêng
                  của mình – nhanh, đẹp, tiện và không cần ra tiệm! ✨
                </p>
                <div className="readmore_bt">
                  {/* <Link href="/design">Design Now</Link> */}
                  <Button
                    onClick={() => handleDesign()}
                    style={{ padding: 20 }}
                  >
                    Design Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ width: "100%" }}>
                <Image src={im} className="image_3" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignNail;

import React from "react";
import Image from "next/image";

import about from "../assets/images/new1.jpg";
import Link from "next/link";
const About = () => {
  return (
    <div className="about_section layout_padding">
      <div className="container">
        <div className="about_section_main">
          <div className="row">
            <div className="col-md-6">
              <div className="about_taital_main">
                <h1 className="about_taital">
                  YOUR NAILS 🎀
                  <br /> YOUR STYLE
                </h1>
                <p className="about_text">
                  TailorNail xin chào cả nhà!
                  <br />
                  <br />
                  TailorNail là nền tảng giúp bạn yêu thích làm nail có thể tự
                  thiết kế, thử mẫu và đặt hàng Nail Box ngay tại nhà với sự hỗ
                  trợ từ công nghệ AI/AR. Chúng mình biến đam mê làm đẹp thành
                  trải nghiệm cá nhân hóa cho từng bạn!
                  <br />
                  <br />
                  TailorNail ra đời để mang đến những bộ móng “may đo” chuẩn gu,
                  giúp bạn tự tin thể hiện cá tính theo cách riêng của mình –
                  nhanh, đẹp, tiện và không cần ra tiệm!
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <Image
                  src={about}
                  className="image_3"
                  alt="About Our Beauty Store"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

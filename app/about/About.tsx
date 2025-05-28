import React from "react";
import Image from "next/image";

import about from "../assets/images/about-nail.jpg";
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
                  Nailbox – chiếc hộp nhỏ cho đôi tay thêm xinh 💅✨
                </h1>
                <p className="about_text">
                  Bạn không cần ra tiệm mà vẫn có thể sở hữu những bộ móng xinh
                  lung linh tại nhà! Với Nailbox, mỗi hộp là một bộ sưu tập đầy
                  màu sắc gồm các mẫu móng giả, phụ kiện trang trí, keo dán và
                  hướng dẫn dễ hiểu – giúp bạn dễ dàng biến hóa phong cách chỉ
                  trong vài phút. Dù bạn thích nhẹ nhàng, bánh bèo hay cá tính
                  nổi bật, chúng mình đều có mẫu phù hợp cho bạn. Cùng nâng niu
                  đôi tay và tự thưởng cho mình một chút “xinh” mỗi ngày nhé!
                  💖🌷
                </p>
                <div className="readmore_bt">
                  <Link href="#">Read More</Link>
                </div>
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

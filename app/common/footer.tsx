import React from "react";
import logo from "../assets/images/logonew.png";
import Image from "next/image";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer_section layout_padding s">
        <div className="container">
          <div className="footer_logo">
            <Link href="/">
              <Image src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="contact_section_2">
            <div className="row">
              <div className="col-sm-4">
                <h3 className="address_text">Contact Us</h3>
                <div className="address_bt">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <span className="padding_left10">
                          Address : Hòa Lạc, Thạch Thất, Hà Nội
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span className="padding_left10">
                          Call : +84 1234567890
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <span className="padding_left10">
                          Email : tailornail@gmail.com
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="footer_logo_1">
                  <Link href="/">
                    <Image src={logo} alt="Logo" />
                  </Link>
                </div>
                <p className="dummy_text">Theo dõi Tailor Nail</p>
              </div>
              <div className="col-sm-4">
                <div className="main">
                  <h3 className="address_text">Về TailorNail</h3>
                  <p className="ipsum_text">
                    TailorNail ra đời với mong muốn mang đến những bộ móng “may
                    đo” dành riêng cho bạn, với thiết kế tinh tế, màu sắc và
                    kiểu dáng do chính bạn lựa chọn.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="social_icon">
            <ul>
              <li>
                <Link href="https://www.facebook.com/profile.php?id=61576755897790">
                  <FaFacebookSquare />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/tailornails868/">
                  <FaInstagramSquare />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            2025 All Rights Reserved. Design by Tailor Nail
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

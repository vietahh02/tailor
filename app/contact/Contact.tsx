import Link from "next/link";
import React from "react";
import insta from "../assets/images/insta.png";
import fb from "../assets/images/fb.png";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <h1 className="contact_taital">
            Theo dõi những bộ sưu tập mới nhất của TailorNail qua:{" "}
          </h1>

          <div className="col-md-6">
            <p className="contact_text">
              <Image src={insta} alt="" />
              <br />
              <Image src={fb} alt="" />
            </p>
          </div>
          <div className="col-md-6">
            <p className="contact_text">
              Instagram:{" "}
              <Link
                href={"https://www.instagram.com/tailornails868/"}
                style={{ color: "pink" }}
              >
                Tailor Nails
              </Link>
              <br />
              Facebook:{" "}
              <Link
                href={"https://www.facebook.com/profile.php?id=61576755897790"}
                style={{ color: "pink" }}
              >
                Tailor Nails
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

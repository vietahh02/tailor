"use client";

import React, { useState } from "react";
import logo from "../assets/images/logonew.png";
import toggle from "../assets/images/toggle-icon.png";
import search from "../assets/images/search-icon.png";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { SlHandbag } from "react-icons/sl";
import { FaUserAlt } from "react-icons/fa";
import Search from "./SearchModal";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const refMenu = React.useRef<HTMLDivElement>(null);

  function openNav() {
    refMenu.current?.style.setProperty("width", "100%");
  }

  function closeNav() {
    refMenu.current?.style.setProperty("width", "0%");
  }

  return (
    <div className="header_section">
      <div className="container">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <div id="mySidenav" className="sidenav" ref={refMenu}>
            <Link
              href="javascript:void(0)"
              className="closebtn"
              onClick={() => closeNav()}
            >
              &times;
            </Link>
            <Link href="/">Trang chủ</Link>
            <Link href="/search">Sản phẩm</Link>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/customers">Khách hàng</Link>
            <Link href="/contact">Liên hệ</Link>
            <Link href="/order">Đơn hàng</Link>
          </div>
          <span className="toggle_icon" onClick={() => openNav()}>
            <Image src={toggle} alt="oke" />
          </span>
          <Link className="logo" href="/">
            <Image src={logo} alt="oke" />
          </Link>
          <form className="form-inline ">
            <div className="login_text">
              <ul>
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
                <li>
                  <Link href="/my-account">My Account</Link>
                </li>
                <li>
                  <Link href="/login">
                    <FaUserAlt />
                  </Link>
                </li>
                <li
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Link href="/cart">
                    <SlHandbag />
                    <span
                      style={{
                        position: "absolute",
                        bottom: -7,
                        right: -7,
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: 12,
                        fontWeight: "bold",
                        lineHeight: 1,
                        minWidth: 18,
                        textAlign: "center",
                        boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      2
                    </span>
                  </Link>
                </li>

                <li
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Link href="/favorite">
                    <GoHeart />
                    <span
                      style={{
                        position: "absolute",
                        bottom: -7,
                        right: -7,
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: 12,
                        fontWeight: "bold",
                        lineHeight: 1,
                        minWidth: 18,
                        textAlign: "center",
                        boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      2
                    </span>
                  </Link>
                </li>

                <li>
                  <Link href="#" onClick={() => setShowSearch(true)}>
                    <Image src={search} alt="oke" />
                  </Link>
                </li>
              </ul>
            </div>
          </form>
        </nav>
      </div>
      <Search isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default Header;

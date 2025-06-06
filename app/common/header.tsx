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
import { useAuth } from "../context/auth.context";
// import { Button } from "antd";
import { IoMdExit } from "react-icons/io";
import { logoutApi } from "../util/api";
import { useRouter } from "next/navigation";
import "./search.css";
import { Button, Image as ImageAntd } from "antd";

const Header = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const refMenu = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { auth, numberCart, numberFavorite, setAuth } = useAuth();

  function openNav() {
    refMenu.current?.style.setProperty("width", "100%");
  }

  function closeNav() {
    refMenu.current?.style.setProperty("width", "0%");
  }

  async function logout() {
    await logoutApi();
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        user_name: "",
        role: "",
        img: "",
      },
    });
    router.push("/");
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
            {auth.isAuthenticated ? (
              <>
                <Link href={"/my-account"}>Thông tin cá nhân</Link>
              </>
            ) : (
              <Link href={"/login"}>Đăng nhập</Link>
            )}
            {auth?.user?.role === "admin" && (
              <Link href={"/admin"}>Trang Admin</Link>
            )}
            <Link href="/search">Sản phẩm</Link>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/customers">Khách hàng</Link>
            <Link href="/contact">Liên hệ</Link>
            <Link href="/cart">Giỏ hàng</Link>
            <Link href="/favorite">Yêu thích</Link>
            <Link href="/order">Đơn hàng</Link>
          </div>
          <span className="toggle_icon" onClick={() => openNav()}>
            <Image src={toggle} alt="oke" style={{ borderRadius: 0 }} />
          </span>
          <Link className="logo" href="/">
            <Image src={logo} alt="oke" />
          </Link>
          <form className="form-inline">
            <div className="login_text">
              <ul>
                {auth?.user?.role === "admin" && (
                  <li>
                    <Link href="/admin">Admin</Link>
                  </li>
                )}
                {!auth?.isAuthenticated ? (
                  <li>
                    <Link href="/login" title="Login">
                      <FaUserAlt />
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <span
                        className="logout"
                        onClick={async () => logout()}
                        title="Logout"
                      >
                        <IoMdExit />
                      </span>
                    </li>
                    {/* <li>
                      <Link href="/my-account" title="My Account">
                        <FaUserAlt />
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        href="/my-account"
                        title="My Account"
                        className="avatar_header_pc"
                      >
                        <ImageAntd
                          src={
                            auth.user?.img !== ""
                              ? auth.user?.img
                              : "https://th.bing.com/th/id/OIP.GvNakgya1kk5A6CFQM6Z4gHaHZ?rs=1&pid=ImgDetMain"
                          }
                          alt=""
                          width={45}
                          height={45}
                          preview={false}
                          style={{ borderRadius: "50%" }}
                          onClick={() => {
                            router.push("/my-account");
                          }}
                        ></ImageAntd>
                      </Link>
                    </li>
                  </>
                )}
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
                        bottom: -8,
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
                      {numberCart}
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
                        bottom: -8,
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
                      {numberFavorite}
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
            <div className="login_text_mobile">
              {auth.isAuthenticated ? (
                <>
                  <ImageAntd
                    src={
                      auth.user?.img !== ""
                        ? auth.user?.img
                        : "https://th.bing.com/th/id/OIP.GvNakgya1kk5A6CFQM6Z4gHaHZ?rs=1&pid=ImgDetMain"
                    }
                    alt=""
                    width={55}
                    height={55}
                    className="avatar_header"
                    preview={false}
                    style={{ borderRadius: "50%" }}
                    onClick={() => {
                      router.push("/my-account");
                    }}
                  ></ImageAntd>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </form>
        </nav>
      </div>
      <Search isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default Header;

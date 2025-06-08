"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaLock, FaPhone, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { toast } from "react-toastify";
import { createUserApi } from "../util/api";
import { useRouter } from "next/navigation";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();
  function isVietnamesePhoneNumber(phone: string): boolean {
    const regex = /^(0|\+84|84)(3|5|7|8|9)\d{8}$/;
    return regex.test(phone);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName === "" || email === "" || password === "" || phone === "") {
      toast.error("Hãy nhập đầy đủ thông tin");
      return;
    }
    if (password !== rePassword) {
      toast.error("Mật khẩu và mật khẩu nhập lại không trùng nhau");
      return;
    }
    if (!isVietnamesePhoneNumber(phone || "")) {
      toast.error("Số điện thoại không đúng định dạng");
      return;
    }

    const res = (await createUserApi(email, userName, phone, password)) as any;
    if (res?.message === "successfull") {
      toast.success("Đăng ký tài khoản thành công");
      router.push("/login");
    } else {
      toast.error("Lỗi hệ thống thử lại sau");
    }
  };
  return (
    <div className="login_bg">
      <div className="wapper">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Đăng ký</h1>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IoIosMail className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Re-Password"
              required
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FaPhone className="icon" />
          </div>
          <button type="submit" className="formButton">
            Đăng ký
          </button>
          <div className="register">
            <p className="registerLink">
              Quay lại trang đăng nhập? <Link href="/login">Đăng nhập</Link>
            </p>
            <p className="registerLink">
              Quay lại trang chủ? <Link href="/">Trang chủ</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

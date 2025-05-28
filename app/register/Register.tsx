import Link from "next/link";
import React from "react";
import { FaLock, FaPhone, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Register = () => {
  return (
    <div className="login_bg">
      <div className="wapper">
        <form className="form">
          <h1>Đăng ký</h1>
          <div className="formGroup">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="formGroup">
            <input type="email" placeholder="Email" required />
            <IoIosMail className="icon" />
          </div>
          <div className="formGroup">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="formGroup">
            <input type="password" placeholder="Re-Password" required />
            <FaLock className="icon" />
          </div>
          <div className="formGroup">
            <input type="text" placeholder="Phone Number" required />
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

import Link from "next/link";
import React from "react";
import { FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login_bg">
      <div className="wapper">
        <form className="form">
          <h1>Đăng nhập</h1>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Username"
              className="formInput"
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Password"
              className="formInput"
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Ghi nhớ
            </label>
            <Link href="/" className="forgot">
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit" className="formButton">
            Đăng nhập
          </button>
          <div className="register">
            <p className="registerLink">
              Tạo một tài khoản <Link href="/register">Đăng ký</Link>
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

export default Login;

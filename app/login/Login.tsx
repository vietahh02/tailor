"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { loginApi } from "../util/api";
// import { notification } from "antd";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  const onFinish = async () => {
    const res = (await loginApi(userName, password)) as any;
    if (!res?.user) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác");
    } else {
      localStorage.setItem("access_token", res?.access_token);
      toast.success("Đăng nhập thành công");
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          user_name: res?.user?.user_name ?? "",
          role: res?.user?.role ?? "",
        },
      });
      if (res?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
    console.log(res);
  };
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Password"
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button type="button" className="formButton" onClick={onFinish}>
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

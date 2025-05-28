"use client";

import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterAdmin = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Tailor Design ©{new Date().getFullYear()} Created by Vkay
    </Footer>
  );
};

export default FooterAdmin;

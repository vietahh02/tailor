"use client";

import React, { useEffect } from "react";
import ZoomContent from "./ZoomContent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 786) {
        toast.info("Tính năng này chỉ hỗ trợ trên máy tính.");
        router.push("/designs");
      }
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);
  return (
    <div>
      <ZoomContent />
    </div>
  );
};

export default Page;

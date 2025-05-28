// components/Screenshot.tsx

"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import test from "../test/test.jpg";
import Image from "next/image";
import Link from "next/link";
import "./test.css";

const Screenshot = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleCapture = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL("image/png");

    // ✅ Xử lý ảnh: ví dụ hiển thị ngay
    setImageSrc(imgData);

    // ✅ Hoặc bạn có thể gửi đi API:
    // await fetch('/api/upload', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ image: imgData })
    // });
  };

  return (
    <div className="p-4">
      <div
        ref={captureRef}
        className="p-4 border border-gray-400 rounded mb-4 bg-white sss"
      >
        <Image src={test} alt="" />
      </div>

      <button
        onClick={handleCapture}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Chụp và xử lý ảnh
      </button>

      <Link href={imageSrc || "/"}>{imageSrc}</Link>
      {imageSrc && (
        <div className="mt-4">
          <p className="font-semibold mb-2">Ảnh đã chụp:</p>
          <img src={imageSrc} alt="Captured" className="border" />
        </div>
      )}
    </div>
  );
};

export default Screenshot;

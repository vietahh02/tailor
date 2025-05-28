"use client";

import React, { useState } from "react";
import { Slider } from "antd";

const RotationSlider = () => {
  const [rotation, setRotation] = useState<number>(0); // Giá trị đang quay
  const [listAction, setListAction] = useState<number[]>([]); // Lịch sử hành động

  const handleChange = (value: number) => {
    // Chỉ cập nhật xoay thôi, không lưu
    setRotation(value);
  };

  const handleAfterChange = (value: number) => {
    // Khi thả chuột -> lưu lại hành động
    setListAction((prev) => [...prev, value]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <Slider
        min={0}
        max={360}
        value={rotation}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        tooltip={{ formatter: null }}
        style={{ width: 300, margin: "0 auto" }}
      />

      <div
        style={{
          marginTop: 40,
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "5px solid #1890ff",
          marginLeft: "auto",
          marginRight: "auto",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.1s linear",
        }}
      />

      <div style={{ marginTop: 20 }}>
        <h4>History (listAction):</h4>
        <ul>
          {listAction.map((val, idx) => (
            <li key={idx}>Rotated to {val}°</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RotationSlider;

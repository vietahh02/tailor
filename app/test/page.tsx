"use client";

import { Button } from "antd";
import { useState } from "react";
import CameraModal from "./CameraModal"; // chỉnh lại path tùy cấu trúc

export default function Page() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setShowCamera(true)}>
        Mở Camera Sau
      </Button>

      <CameraModal open={showCamera} onClose={() => setShowCamera(false)} />
    </div>
  );
}

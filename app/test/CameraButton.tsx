// components/CameraButton.tsx
"use client";

import { useRef } from "react";
import { startCameraKit } from "./useCameraKit";

export default function CameraButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClick = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      await startCameraKit(canvas);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Bật Camera</button>
      <canvas ref={canvasRef} id="canvas" width={640} height={480} />
    </div>
  );
}

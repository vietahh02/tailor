"use client";

import { useEffect, useRef } from "react";

interface HandTrackingProps {
  url: string;
  onClose: () => void;
}

const HandTracking: React.FC<HandTrackingProps> = ({ url, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<any>(null);

  const nailImg = new window.Image();
  nailImg.src = url;

  useEffect(() => {
    const initCamera = async (facingMode: "user" | "environment") => {
      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        if (!canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0
        ) {
          const landmarks = results.multiHandLandmarks[0];

          const wrist = landmarks[0];
          const middleFingerBase = landmarks[9];
          const handScale = Math.hypot(
            (wrist.x - middleFingerBase.x) * canvas.width,
            (wrist.y - middleFingerBase.y) * canvas.height
          );

          const fingerTips = [4, 8, 12, 16, 20];

          fingerTips.forEach((idx) => {
            const lmTip = landmarks[idx];
            const lmLower = landmarks[idx - 1];

            const dx = (lmTip.x - lmLower.x) * canvas.width;
            const dy = (lmTip.y - lmLower.y) * canvas.height;

            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, -dx) + Math.PI / 2;

            const baseNailSize = dist * 3.5;
            const nailSize = baseNailSize * (handScale / 250);

            let offsetY = 4 + nailSize / 50;
            offsetY = Math.min(Math.max(offsetY, 1), 22);

            const x = canvas.width * (1 - lmTip.x);
            const y = canvas.height * lmTip.y;
            ctx.save();
            ctx.translate(x, y - offsetY);
            ctx.rotate(angle);
            if (nailImg.complete) {
              ctx.drawImage(
                nailImg,
                -nailSize / 2,
                -nailSize / 2,
                nailSize,
                nailSize
              );
            }
            ctx.restore();
          });
        }
      });

      if (videoRef.current) {
        const LOW_RES_WIDTH = 640;
        const LOW_RES_HEIGHT = 480;
        const dpr = 1;

        canvas.width = LOW_RES_WIDTH * dpr;
        canvas.height = LOW_RES_HEIGHT * dpr;
        canvas.style.width = `${LOW_RES_WIDTH}px`;
        canvas.style.height = `${LOW_RES_HEIGHT}px`;

        ctx.scale(dpr, dpr);

        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await hands.send({ image: videoRef.current });
            }
          },
          facingMode,
          width: LOW_RES_WIDTH,
          height: LOW_RES_HEIGHT,
        });

        camera.start();
        cameraRef.current = camera;
      }
    };

    const tryInit = async () => {
      try {
        await initCamera("environment");
      } catch {
        try {
          await initCamera("user");
        } catch {
          console.error("Không thể khởi tạo camera.");
        }
      }
    };

    tryInit();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }

      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "10px",
          width: "100%",
          maxWidth: "720px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 100,
            background: "#f5222d",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <video ref={videoRef} style={{ display: "none" }} playsInline muted />
        <canvas
          ref={canvasRef}
          style={{
            width: "100vw",
            maxWidth: "100%",
            height: "auto",
            maxHeight: "80vh",
            borderRadius: "8px",
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
};

export default HandTracking;

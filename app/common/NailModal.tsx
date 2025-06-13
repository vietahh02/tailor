import { useEffect, useRef, useState } from "react";

interface NailModalProps {
  url?: string;
  onClose: () => void;
}

const NailModal: React.FC<NailModalProps> = ({
  url = "https://res.cloudinary.com/dlpcempww/image/upload/v1749784577/qvakkzbwrcm3unwppitx.png",
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<any>(null);

  const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoInputs(videoDevices);
      if (videoDevices.length > 0) {
        setCurrentCameraId(videoDevices[0].deviceId);
      }
      console.log(videoDevices);
    });
  }, []);

  useEffect(() => {
    if (!currentCameraId) return;

    let hands: any;

    const loadMediapipe = async () => {
      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const nailImg = new Image();
      nailImg.src = url;

      hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: import("@mediapipe/hands").Results) => {
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
            ctx.drawImage(
              nailImg,
              -nailSize / 2,
              -nailSize / 2,
              nailSize,
              nailSize
            );
            ctx.restore();
          });
        }
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: currentCameraId ? { exact: currentCameraId } : undefined,
        },
      });

      video.srcObject = stream;

      const camera = new Camera(video, {
        onFrame: async () => {
          await hands.send({ image: video });
        },
        width: 640,
        height: 480,
      });

      cameraRef.current = camera;

      video.addEventListener("loadeddata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      });

      camera.start();
    };

    loadMediapipe();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [currentCameraId, url]);

  const handleClose = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    onClose();
  };

  const switchCamera = () => {
    if (videoInputs.length <= 1) return;
    const currentIndex = videoInputs.findIndex(
      (d) => d.deviceId === currentCameraId
    );
    const nextIndex = (currentIndex + 1) % videoInputs.length;
    setCurrentCameraId(videoInputs[nextIndex].deviceId);
  };

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
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 24,
            height: 24,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {videoInputs.length > 1 && (
          <button
            onClick={switchCamera}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Đổi camera
          </button>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ display: "none" }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "80vh",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default NailModal;

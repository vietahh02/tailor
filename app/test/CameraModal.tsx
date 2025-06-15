"use client";

import { Modal, message } from "antd";
import { useRef, useState, useEffect } from "react";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open]);

  const startCamera = async () => {
    try {
      // Thử mở camera sau
      const backStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } },
        audio: false,
      });
      setStream(backStream);
      if (videoRef.current) {
        videoRef.current.srcObject = backStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn("Không mở được camera sau, thử camera trước.", err);

      try {
        // Fallback: camera trước
        const frontStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setStream(frontStream);
        if (videoRef.current) {
          videoRef.current.srcObject = frontStream;
          videoRef.current.play();
        }
        message.warning(
          "Đang sử dụng camera trước vì không truy cập được camera sau."
        );
      } catch (err2) {
        console.error("Không mở được camera trước luôn.", err2);
        message.error("Không thể mở camera.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width="90%"
      centered
      destroyOnClose
    >
      <video
        ref={videoRef}
        style={{ width: "100%", borderRadius: "8px" }}
        playsInline
        muted
      />
    </Modal>
  );
};

export default CameraModal;

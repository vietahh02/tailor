"use client";

import { useState } from "react";
import HandTracking from "./HandTracking";

export default function Page() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      {!showCamera && (
        <button
          onClick={() => setShowCamera(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Mở camera
        </button>
      )}

      {showCamera && (
        <HandTracking
          onClose={() => setShowCamera(false)}
          url={
            "https://res.cloudinary.com/dlpcempww/image/upload/v1749784577/qvakkzbwrcm3unwppitx.png"
          }
        />
      )}
    </div>
  );
}

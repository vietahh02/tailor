// components/useCameraKit.ts
export const startCameraKit = async (canvas: HTMLCanvasElement) => {
  if (typeof window === 'undefined') return; // đảm bảo chỉ chạy trên client

  // 💡 Import động trong client
  const { bootstrapCameraKit } = await import("@snap/camera-kit");

  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQxMTE3MDI3LCJzdWIiOiJkNmRkNDAzZC00M2E4LTQ3ZjctOGI3Yy1lNzI2MzMyZWE2OWR-U1RBR0lOR344ODc5OWRmMi0yZmY1LTRkNzMtYWEwMi0yZDRiMmVjZWZhYTcifQ.GTKtr3Dm_8rr8wGAam7yqSd1Z4KgvPRGZHAgsEJmTNs'
  });

  const session = await cameraKit.createSession({ liveRenderTarget: canvas });

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '2752941e-ae53-42d4-bc4f-69d6b306e5f9',
    '62caf14d-d863-4bad-aca2-79cb762d3ecf'
  );

  await session.applyLens(lens);
};

import { Spin } from "antd";

const FullScreenSpinner = () => {
  return (
    <div style={styles.container}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

const styles = {
  container: {
    height: "60vh", // Chiếm toàn bộ chiều cao viewport
    display: "flex", // Flex để căn giữa
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "#fff", // (Tùy chọn) đặt màu nền
    zIndex: 1000, // (Tùy chọn) nếu bạn dùng overlay
  },
};

export default FullScreenSpinner;

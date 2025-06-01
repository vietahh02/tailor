import React from "react";
import { Modal } from "antd";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  content?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onCancel,
  onConfirm,
  confirmText = "Có",
  cancelText = "Không",
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={onConfirm}
      okText={confirmText}
      cancelText={cancelText}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;

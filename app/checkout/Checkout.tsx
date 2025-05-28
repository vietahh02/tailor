"use client";

import React, { useState } from "react";
import "./CheckoutPage.css";
import { Image } from "antd";

const CheckoutPage: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className=" container ck-container">
      <div className="ck-form-section">
        <h2>Thông tin khách hàng</h2>

        <div className="mb-3">
          <label className="form-label">
            Họ và tên <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Nhập họ tên"
            className="ck-input-full"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Số điện thoại <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Nhập số điện thoại"
            className="ck-input-full"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Số điện thoại phải gồm 10 chữ số"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Địa chỉ <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Nhập địa chỉ"
            className="ck-input-full"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ảnh</label>
          <input
            type="file"
            accept="image/*"
            className="ck-input-full"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="mt-2">
              <Image
                src={previewImage}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Ghi chú (tuỳ chọn)</label>
          <textarea
            name="note"
            placeholder="Nhập ghi chú nếu có"
            className="ck-textarea"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="ck-summary-section">
        <h2>Your order</h2>
        <table className="ck-summary-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bộ Móng Giả Mẫu 266 | Hàng Handmade | Ship Toàn Quốc ×1</td>
              <td>250.000 đ</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>250.000 đ</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free shipping</td>
            </tr>
            <tr>
              <td>Tổng</td>
              <td>
                <strong>250.000 đ</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="ck-privacy-text">
          Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và tăng
          trải nghiệm sử dụng website của chúng tôi.
        </p>

        <button className="ck-place-order btn btn-primary">Place order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;

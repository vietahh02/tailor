"use client";

import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { Form, Image, Input } from "antd";
import AddressSelector from "./VietNamAddress";
import { toast } from "react-toastify";
import { clearCartApi, createOrderApi, getAllCartApi } from "../util/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";

const CheckoutPage: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: [] as string[],
    address2: "",
    note: "",
    feeShip: 0 as number,
    image: null as File | null,
  });

  const { setNumberCart } = useAuth();

  const [carts, setCarts] = useState();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const storedCarts = await getAllCartApi();
      if (storedCarts) {
        setCarts(storedCarts);
      }
    };
    fetchData();
  }, []);

  // Clean up previous preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cleanup old preview URL
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  function getShippingFee(locations: string[]): number {
    const combined = locations.join(" ");

    if (combined.includes("Thạch Thất")) {
      return 0;
    } else if (combined.includes("Hà Nội")) {
      return 15000;
    } else {
      return 30000;
    }
  }

  const handleSubmit = async () => {
    if (
      formData.fullName === "" ||
      formData.address.length < 3 ||
      formData.phone === "" ||
      formData.image === null
    ) {
      toast.error("Hãy nhập đầy đủ thông tin");
      return;
    }
    if (!isValidVietnamPhone(formData.phone)) {
      toast.error("Hãy nhập đúng định dạng số điện thoại");
      return;
    }

    const res = await createOrderApi(
      JSON.stringify({
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        shipping_address:
          (formData.address2 && formData.address2 + ", ") +
          formData.address.reverse().join(", "),
        shipping_fee: formData.feeShip,
        note: formData.note,
        items: carts?.items?.map((i) => {
          return {
            product_id: i.product_id,
            quantity: i.quantity,
            price: i.product.price,
          };
        }),
      }),
      formData.image
    );
    if (res.message === "successful") {
      await clearCartApi();
      toast.success("Đặt hàng thành công");
      setNumberCart(0);
      router.push("/order");
    } else {
      toast.error("Hãy đăng nhập để đặt hàng");
    }
  };

  function isValidVietnamPhone(phone: string): boolean {
    const regexVNPhone =
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    return regexVNPhone.test(phone);
  }

  function calculateTotal(): string {
    const total = carts?.items?.reduce((sum, item) => {
      const { quantity, product } = item;
      const discountedPrice = product.price * (1 - product.discount / 100);
      return sum + quantity * discountedPrice;
    }, 0);

    return total;
  }

  return (
    <div className="container ck-container">
      <Form className="ck-form-section">
        <h2>Thông tin khách hàng</h2>

        {/* Full name */}
        <div className="mb-3">
          <label className="form-label">
            Họ và tên <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            size="large"
            type="text"
            name="fullName"
            placeholder="Nhập họ tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">
            Số điện thoại <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            size="large"
            type="tel"
            name="phone"
            placeholder="Nhập số điện thoại"
            className="ck-input-full"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Số điện thoại phải gồm 10 chữ số"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault(); // chặn nếu không phải số
              }
            }}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">
            Địa chỉ <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <AddressSelector formData={formData} setFormData={setFormData} />
        </div>

        {/* Address 2 */}
        <div className="mb-3">
          <label className="form-label">
            Địa chỉ cụ thể <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            size="large"
            type="text"
            name="address2"
            placeholder="Nhập địa chỉ"
            className="ck-input-full"
            value={formData.address2}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">
            Ảnh size móng <span style={{ color: "red" }}>*</span>
          </label>
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

        {/* Note */}
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
      </Form>

      {/* Order summary */}
      <div className="ck-summary-section">
        <h2>Đơn hàng của bạn</h2>
        <table className="ck-summary-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {carts?.items.map((c) => (
              <tr key={c.id}>
                <td>{c.product.name}</td>
                <td className="text-center">{c.quantity}</td>
                <td>
                  {(
                    c.product.price -
                    (c.product.price * c.product.discount) / 100
                  )?.toLocaleString()}{" "}
                  đ
                </td>
                <td>
                  {(
                    (c.product.price -
                      (c.product.price * c.product.discount) / 100) *
                    c.quantity
                  )?.toLocaleString()}{" "}
                  đ
                </td>
              </tr>
            ))}
            <tr>
              <td>Subtotal</td>
              <td></td>
              <td></td>
              <td>{calculateTotal()?.toLocaleString()} đ</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td></td>
              <td></td>
              <td>
                {getShippingFee(formData.address) === 0
                  ? "Free Shipping"
                  : getShippingFee(formData.address)?.toLocaleString() + " đ"}
              </td>
            </tr>
            <tr>
              <td>Tổng</td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  {(
                    getShippingFee(formData.address) + calculateTotal()
                  )?.toLocaleString()}{" "}
                  đ
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="ck-privacy-text">
          Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và tăng
          trải nghiệm sử dụng website của chúng tôi.
        </p>

        <button
          className="ck-place-order btn btn-primary"
          onClick={handleSubmit}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

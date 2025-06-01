"use client";

import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import { useRouter } from "next/navigation";
import { Image } from "antd";
import {
  getAllCartApi,
  removeCartApi,
  updateQuantityCartApi,
} from "../util/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState();
  const router = useRouter();

  const { setNumberCart } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCartApi();
      console.log(res);
      setCart(res.items);
    };
    fetchData();
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleIncrease = async (id: number, quantityNow: number) => {
    const res = await updateQuantityCartApi(id, quantityNow + 1);
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev + 1 : 1));
      setCart((prev) =>
        prev?.map((p) => {
          if (p.product_id === id) {
            return { ...p, quantity: quantityNow + 1 };
          }
          return p;
        })
      );
    } else {
      toast.error("Lỗi hệ thống hãy quay lại sau hoặc reaload page");
    }
  };

  const handleDecrease = async (id: number, quantityNow: number) => {
    if (quantityNow === 1) return;
    const res = await updateQuantityCartApi(id, quantityNow - 1);
    console.log(res);
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev - 1 : 0));
      setCart((prev) =>
        prev?.map((p) => {
          if (p.product_id === id) {
            return { ...p, quantity: quantityNow - 1 };
          }
          return p;
        })
      );
    } else {
      toast.error("Lỗi hệ thống hãy quay lại sau hoặc reaload page");
    }
  };

  const handleDeleteCart = async (id: number, quantity: number) => {
    const res = await removeCartApi(id);
    console.log(res);
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev - quantity : 0));
      setCart((prev) => prev?.filter((p) => p.product_id !== id));
      toast.success("Xóa sản phẩm thành công ra khỏi giỏ hàng");
    } else {
      toast.error("Lỗi hệ thống hãy thử lại sau");
    }
  };

  return (
    <div className="container ct-container">
      <h1 className="ct-title">Giỏ hàng</h1>
      <p className="ct-shipping-note">Miễn ship nếu mua toàn bộ cửa hàng</p>
      <p className="ct-return-note">
        Miễn phí đổi trả trong vòng 7 ngày nếu có lỗi từ phía shop
      </p>

      <div className="ct-main">
        {/* Left Column */}
        <div className="ct-left">
          {cart ? (
            <>
              <h2 className="ct-item-count">{cart?.length} Sản phẩm</h2>
              {cart?.map((c) => (
                <div className="ct-item" key={c.id}>
                  <div className="ct-item-info">
                    <Image
                      src={c.product.images[0]}
                      alt="Product"
                      className="ct-item-img"
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="ml-5">
                      <div>{c.product.name}</div>
                      <div className="ct-item-weight">{c.product.category}</div>
                    </div>
                  </div>
                  <div className="ct-item-actions">
                    <div className="ct-qty-control">
                      <button
                        className="ct-qty-btn"
                        onClick={() => handleDecrease(c.product_id, c.quantity)}
                      >
                        −
                      </button>
                      <span className="ct-qty-value">{c.quantity}</span>
                      <button
                        className="ct-qty-btn"
                        onClick={() => handleIncrease(c.product_id, c.quantity)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ct-remove-btn"
                      onClick={() => handleDeleteCart(c.product_id, c.quantity)}
                    >
                      ✕
                    </button>
                    <div className="ct-price">
                      {(
                        (c.product.price * (100 - c.product.discount)) /
                        100
                      ).toLocaleString()}{" "}
                      ₫
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>Loading...</>
          )}
        </div>

        {/* Right Column */}
        <div className="ct-right">
          <h2 className="ct-summary-title">ORDER SUMMARY</h2>
          <div className="ct-summary">
            <div className="ct-summary-line">
              <span>SUBTOTAL</span>

              <span>
                {cart
                  ?.reduce((total, item) => {
                    const priceAfterDiscount =
                      (item.product?.price * (100 - item.product?.discount)) /
                      100;
                    return total + item.quantity * priceAfterDiscount;
                  }, 0)
                  .toLocaleString()}{" "}
                ₫
              </span>
            </div>
            <p className="ct-summary-note">Discounts applied at checkout</p>
            <button className="ct-checkout-btn" onClick={handleCheckout}>
              Tiếp tục thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

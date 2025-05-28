"use client";

import React, { useState } from "react";
import "./ShoppingCart.css";
import { useRouter } from "next/navigation";

const ShoppingCart: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container ct-container">
      <h1 className="ct-title">SHOPPING CART</h1>
      <p className="ct-shipping-note">
        Free Shipping on Orders Over $50 (For US only)
      </p>
      <p className="ct-return-note">
        Free returns for un-opened products within 30 days
      </p>

      <div className="ct-main">
        {/* Left Column */}
        <div className="ct-left">
          <h2 className="ct-item-count">1 ITEM</h2>
          <div className="ct-item">
            <div className="ct-item-info">
              <img
                src="https://i.imgur.com/kJgO1cz.png"
                alt="Product"
                className="ct-item-img"
              />
              <div>
                <div>15g Open Mind - 15g</div>
                <div className="ct-item-weight">15g</div>
              </div>
            </div>
            <div className="ct-item-actions">
              <div className="ct-qty-control">
                <button className="ct-qty-btn" onClick={handleDecrease}>
                  −
                </button>
                <span className="ct-qty-value">{quantity}</span>
                <button className="ct-qty-btn" onClick={handleIncrease}>
                  +
                </button>
              </div>
              <button className="ct-remove-btn">✕</button>
              <div className="ct-price">$10.95</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="ct-right">
          <h2 className="ct-summary-title">ORDER SUMMARY</h2>
          <div className="ct-summary">
            <div className="ct-summary-line">
              <span>SHIPPING</span>
              <span>$10.00</span>
            </div>
            <div className="ct-summary-line">
              <span>SUBTOTAL</span>
              <span>$10.95</span>
            </div>
            <p className="ct-summary-note">Discounts applied at checkout</p>
            <button className="ct-checkout-btn" onClick={handleCheckout}>
              CONTINUE TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

"use client";

import React from "react";
import { Card, Button, Rate, Image } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  addNewFavoriteApi,
  addToCartApi,
  removeFavoriteApi,
} from "../util/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

const { Meta } = Card;

export interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  discountedPrice: number;
  average_rating?: number;
  is_favorite: boolean;
  favorite_id?: number;
}

interface ProductCardProps {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<undefined>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, setProducts }) => {
  const router = useRouter();
  const { setNumberCart, setNumberFavorite } = useAuth();

  const handleCardClick = () => {
    router.push(`/product-detail/${product.id}`);
  };

  const handleAddToCart = async () => {
    const res = await addToCartApi(product?.id, 1);
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev + 1 : 1));
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.error("Thêm sản phẩm khoogn thành công");
    }
  };
  const handleFavorite = async (id_favor: number, status: boolean) => {
    if (status) {
      const res = await removeFavoriteApi(id_favor);
      if (res.message === "successful") {
        setNumberFavorite((prev) => (prev ? prev - 1 : 0));
        setProducts((prev) =>
          prev?.map((p) => {
            if (p.id === product.id)
              return { ...p, is_favorite: false, favorite_id: null };
            return p;
          })
        );
        toast.success("Bỏ yêu thích thành công");
      } else {
        toast.error("Hệ thống đang lỗi hoặc quá tải vui lòng thử lại sau");
      }
    } else {
      const res = await addNewFavoriteApi(product.id);
      if (res.message === "successful") {
        setNumberFavorite((prev) => (prev ? prev + 1 : 1));
        setProducts((prev) =>
          prev?.map((p) => {
            if (p.id === product.id)
              return { ...p, is_favorite: true, favorite_id: res.data.id };
            return p;
          })
        );
        toast.success("Thêm vào yêu thích thành công");
      } else {
        toast.error("Hệ thống đang lỗi hoặc quá tải vui lòng thử lại sau");
      }
    }
  };

  return (
    <Card
      hoverable
      style={{
        flex: "1 1 calc(33.333% - 16px)",
        boxSizing: "border-box",
        padding: 16,
      }}
      onClick={handleCardClick}
      cover={
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.image || ""}
            alt={product.name}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            preview={false}
          />
        </div>
      }
    >
      <Meta
        title={product.name}
        description={
          <>
            <div style={{ marginBottom: 8 }}>
              {product?.discountedPrice > 0 ? (
                <>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {(
                      ((100 - product.discountedPrice) * product.price) /
                      100
                    ).toLocaleString()}
                    ₫
                  </span>{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginLeft: 8,
                    }}
                  >
                    {product.price.toLocaleString()}₫
                  </span>
                </>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {product.price.toLocaleString()}₫
                </span>
              )}
            </div>

            <Rate
              disabled
              defaultValue={product.average_rating || 1}
              allowHalf
              style={{ fontSize: 14 }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
              onClick={(e) => e.stopPropagation()} // tránh click chuyển trang
            >
              <div title="Thêm vào giỏ hàng">
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  onClick={handleAddToCart}
                />
              </div>

              <div>
                {product.is_favorite ? (
                  <Button
                    type="text"
                    icon={<HeartFilled />}
                    size="large"
                    onClick={() =>
                      handleFavorite(product.favorite_id, product.is_favorite)
                    }
                    style={{ color: "red" }}
                    title="Bỏ thích"
                  />
                ) : (
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    size="large"
                    onClick={() =>
                      handleFavorite(product.favorite_id, product.is_favorite)
                    }
                    title="Yêu thích"
                  />
                )}
              </div>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;

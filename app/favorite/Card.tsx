"use client";

import React from "react";
import { Card, Button, Rate, Image } from "antd";
import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";
import { addToCartApi, removeFavoriteApi } from "../util/api";
import { toast } from "react-toastify";

const { Meta } = Card;

export interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  discountedPrice: number;
  average_rating?: number;
  is_favorite: boolean;
}

interface ProductCardProps {
  id_favor: number;
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<undefined>>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setProducts,
  id_favor,
}) => {
  const router = useRouter();
  const { setNumberCart, setNumberFavorite } = useAuth();

  console.log(product);

  const handleCardClick = () => {
    router.push(`/product-detail/${product.id}`);
  };

  const handleAddToCart = async () => {
    const res = (await addToCartApi(product?.id, 1)) as any;
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev + 1 : 1));
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.info("Hãy đăng nhập để thêm sản phẩm vào yêu thích");
      router.push("/login");
    }
  };
  const handleFavorite = async () => {
    const res = (await removeFavoriteApi(id_favor)) as any;
    if (res.message === "successful") {
      setNumberFavorite((prev) => (prev ? prev - 1 : 0));
      setProducts((prev: any) => prev?.filter((p: any) => p.id !== id_favor));
      toast.success("Bỏ yêu thích thành công");
    } else {
      toast.error("Phiên đăng nhập đã hết hạn, hãy đăng nhập lại");
      router.push("/login");
    }
  };

  return (
    <Card
      hoverable
      style={{
        flex: "1 1 calc(25% - 16px)",
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div title="Thêm vào giỏ hàng">
                <Button
                  type="default"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  onClick={handleAddToCart}
                  style={{ background: "#f5ddb6" }}
                >
                  Add to cart+
                </Button>
              </div>

              <div title="Yêu thích">
                <Button
                  type="link"
                  icon={<HeartFilled />}
                  size="large"
                  onClick={() => handleFavorite()}
                  style={{ color: "red" }}
                  title="Bỏ thích"
                />
              </div>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;

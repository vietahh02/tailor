"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, Image } from "antd";
import { useAuth } from "../context/auth.context";
import {
  addNewFavoriteApi,
  addToCartApi,
  removeFavoriteApi,
} from "../util/api";
import { toast } from "react-toastify";

type Props = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  discount: number;
  is_favorite: boolean;
  favorite_id: number | null;
  setProducts: React.Dispatch<React.SetStateAction<undefined>>;
};

const Product = ({
  id,
  name,
  category,
  image,
  price,
  discount,
  is_favorite,
  favorite_id,
  setProducts,
}: Props) => {
  const router = useRouter();
  const { setNumberFavorite, setNumberCart } = useAuth();

  const handleRedirect = () => {
    router.push(`/product-detail/${id}`);
  };

  const handleFavorite = async () => {
    if (is_favorite && favorite_id) {
      const res = (await removeFavoriteApi(favorite_id)) as any;
      console.log(res);
      if (res.message === "successful") {
        setNumberFavorite((prev) => (prev ? prev - 1 : 0));
        setProducts((prev: any) =>
          prev?.map((p: any) => {
            if (p.id === id) {
              return { ...p, is_favorite: false, favorite_id: null };
            }
            return p;
          })
        );
        toast.success("Bỏ yêu thích thành công");
      } else {
        toast.error("Hệ thống đang lỗi hoặc quá tải vui lòng thử lại sau");
      }
    } else {
      const res = (await addNewFavoriteApi(id)) as any;
      console.log(res);
      if (res.message === "successful") {
        setNumberFavorite((prev) => (prev ? prev + 1 : 1));
        setProducts((prev: any) =>
          prev?.map((p: any) => {
            if (p.id === id) {
              return { ...p, is_favorite: true, favorite_id: res.data.id };
            }
            return p;
          })
        );
        toast.success("Thêm vào yêu thích thành công");
      } else {
        toast.error("Hệ thống đang lỗi hoặc quá tải vui lòng thử lại sau");
      }
    }
  };

  const handleAddToCart = async () => {
    const res = (await addToCartApi(id, 1)) as any;
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev + 1 : 1));
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.error("Thêm sản phẩm khoogn thành công");
    }
  };

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="product_box">
        <div onClick={() => handleRedirect()} className="cursor-pointer">
          <h4 className="bursh_text">{name}</h4>
          {/* <p className="lorem_text">{category}</p> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={image}
              className="image_1"
              alt="Name Nail"
              preview={false}
              style={{
                width: "100%",
                textAlign: "center",
                margin: "20px 0px",
                padding: "0px 20px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="btn_main">
          <div className="buy_bt">
            <ul className="d-flex gap-3 align-items-center">
              <li>
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </li>
              <li className="active">
                <div
                  onClick={() => handleFavorite()}
                  className="d-flex"
                  style={{ fontSize: "22px", gap: "5px", color: "red" }}
                >
                  {is_favorite ? <FaHeart /> : <FaRegHeart />}
                </div>
              </li>
            </ul>
          </div>
          <h3 className="price_text">
            {(price - (price * discount) / 100).toLocaleString()} ₫
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Product;

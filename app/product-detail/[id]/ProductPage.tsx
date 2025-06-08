"use client";

import "./style-detail.css";

import Slider from "react-slick";
import { useState, ChangeEvent, useEffect } from "react";
import Description from "./Description";
import FeedBack from "./FeedBack";
import Link from "next/link";
import { useParams } from "next/navigation";
import { addToCartApi, getProductById } from "@/app/util/api";
import { useRouter } from "next/navigation";
import { Image, Space } from "antd";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/auth.context";
import CatLoader from "@/app/loading/CatLoader";

const ProductCard = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>();

  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { setNumberCart } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = (await getProductById(Number(id))) as any;
      if (res.detail) {
        router.push("/product-detail");
        return;
      }
      setProduct(res);
    };
    fetchProduct();
  }, []);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    const res = (await addToCartApi(product?.id, quantity)) as any;
    if (res.message === "successful") {
      setNumberCart((prev) => (prev ? prev + quantity : quantity));
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.error("Thêm sản phẩm không thành công");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = parseInt(value, 10);

    if (!isNaN(number) && number > 0) {
      setQuantity(number);
    } else if (value === "") {
      setQuantity(1);
    }
  };

  const handleTryOn = () => {
    toast.info("Chức năng đang trong thời gian nâng cấp hãy thử lại sau");
  };

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          {product && (
            <Image
              src={product.images[i].url}
              alt={`Thumbnail ${i + 1}`}
              width={60}
              height={60}
              preview={false}
            />
          )}
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {!product ? (
        <CatLoader />
      ) : (
        <>
          <div className="container p-3">
            <nav className="pd-breadcrumb">
              <Link href={"/"}>Home</Link> /{" "}
              <strong>{!product ? <>Loading.....</> : product.name}</strong>
            </nav>
            <div className="pd-product ">
              <div className="slider-container pd-image">
                <Slider {...settings}>
                  {product.images?.map((i: any, idx: number) => (
                    <div key={idx}>
                      <Image
                        src={i.url}
                        alt=""
                        sizes="100vw"
                        // width={600}
                        height={600}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="pd-details ">
                <h1 className="pd-title">{product.name}</h1>
                <p className="pd-sku">
                  Phong cách: <strong>{product.category}</strong>
                </p>
                {/* <p className="pd-brand">NAILBOX</p> */}
                <Space style={{ background: "#fafafa", width: "100%" }}>
                  <p className="pd-price-current">
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toLocaleString()}{" "}
                    ₫
                  </p>
                  {product.discount != 0 && (
                    <p className="pd-price-old">
                      {product.price.toLocaleString()} ₫
                    </p>
                  )}
                  {product.discount != 0 && (
                    <p className="pd-discount">
                      {product.discount.toLocaleString()}%
                    </p>
                  )}
                </Space>

                <div className="pd-quantity-add">
                  <div className="pd-qty">
                    <button onClick={handleDecrease}>-</button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={handleChange}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <button onClick={handleIncrease}>+</button>
                  </div>
                  <button className="pd-add-to-cart" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                  <button className="pd-try-on" onClick={handleTryOn}>
                    Try On
                  </button>
                </div>

                <p className="pd-category">
                  {/* <div>
                Phong cách: <strong>{product.category}</strong>
              </div> */}
                  <div>
                    Họa tiết: <strong>{product.pattern}</strong>
                  </div>
                  <div>
                    Độ dài móng: <strong>{product.nail_length}</strong>
                  </div>
                </p>

                <div className="pd-share">
                  <Description des={product?.description} />
                </div>
              </div>
            </div>
            <div className="pd-tabs">
              {/* <span className="pd-tab">⭐ Đánh giá</span> */}
            </div>
            <FeedBack id={product?.id} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductCard;

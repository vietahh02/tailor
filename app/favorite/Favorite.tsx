"use client";

import React, { useEffect, useState } from "react";
import { Col, Empty, Pagination, Row } from "antd";
import { getAllFavoriteApi } from "../util/api";
import { toast } from "react-toastify";
import ProductCard from "./Card";
import CatLoader from "../loading/CatLoader";
const PRODUCTS_PER_PAGE = 12;

const Favorite = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllFavoriteApi()) as any;
      if (res?.message === "Success") {
        setProducts(res.data);
      } else {
        toast.error("lỗi hệ thống");
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products?.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="product_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="product_taital">Danh sách yêu thích</h1>
            <p className="product_text">
              💖 Nailbox siêu xinh cho nàng xinh – chỉ cần mở hộp là có ngay bộ
              móng lung linh ✨, xinh hết nấc! 💅
            </p>
          </div>
        </div>
        {!products ? (
          <CatLoader />
        ) : (
          <>
            <div className="row product_section_2 layout_padding">
              {currentProducts && currentProducts?.length > 0 ? (
                <>
                  <Row gutter={[16, 16]}>
                    {currentProducts?.map((product: any) => (
                      <Col xs={24} sm={12} md={6} key={product.product.id}>
                        {" "}
                        <ProductCard
                          product={{
                            id: product?.product.id,
                            name: product?.product.name,
                            image: product?.product.images[0],
                            price: product?.product.price,
                            discountedPrice: product?.product.discount,
                            average_rating: product?.product.average_rating,
                            is_favorite: product?.product.is_favorite,
                          }}
                          id_favor={product.id}
                          setProducts={setProducts}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Pagination
                    className="mt-5"
                    current={currentPage}
                    pageSize={PRODUCTS_PER_PAGE}
                    total={products?.length}
                    onChange={handlePageChange}
                    align="center"
                  />
                </>
              ) : (
                <Empty description="Hãy bắt đầu thăm quan shop của bọn mình nào" />
              )}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorite;

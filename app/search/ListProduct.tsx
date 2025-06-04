"use client";

import React, { useEffect, useState } from "react";
import { Col, Empty, Pagination, Row } from "antd";
import { getAllProduct } from "../util/api";
import { toast } from "react-toastify";
import ProductCard from "./Card";
import CatLoader from "../loading/CatLoader";
const PRODUCTS_PER_PAGE = 12;

type Props = {
  search: string;
  selectedStyles: string[];
  selectedJobs: string[];
  patterns: string[];
  length: string[];
  purpose: string[];
  specialOccasions: string[];
};

const ListProduct = ({
  search,
  selectedStyles,
  selectedJobs,
  patterns,
  length,
  purpose,
  specialOccasions,
}: Props) => {
  const [products, setProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getAllProduct()) as any;
      if (res?.message) {
        toast.error("Lỗi hệ thống hãy thử lại sau");
      } else {
        setProducts(res);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filterProducts = products?.filter((p: any) => {
    const a =
      (isSubstring(search, p?.name) || isSubstring(search, p?.description)) &&
      hasCommonElement(selectedStyles, p?.category?.split(",") || []) &&
      hasCommonElement(selectedJobs, p?.job?.split(",") || []) &&
      hasCommonElement(patterns, p?.pattern?.split(",") || []) &&
      hasCommonElement(purpose, p?.purpose?.split(",") || []) &&
      hasCommonElement(specialOccasions, p?.occasion?.split(",") || []) &&
      isStringInArray(p?.nail_length || "", length);

    return a;
  });

  function isSubstring(string1: string, string2: string): boolean {
    if (!string1) return true;
    if (!string2) return false;
    return string2.trim().toLowerCase().includes(string1.trim().toLowerCase());
  }

  function hasCommonElement(arr1: string[], arr2: string[]): boolean {
    if (!arr1?.length) return true;
    if (!arr2?.length) return false;
    return arr1.some((item) => arr2.includes(item));
  }

  function isStringInArray(str: string, arr: string[]): boolean {
    if (!arr?.length) return true;
    const normalizedStr = str.trim().toLowerCase();
    return arr.some((item) => item.trim().toLowerCase() === normalizedStr);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filterProducts?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading ? (
        <CatLoader />
      ) : (
        <div className="product_section ">
          <div className="container">
            {currentProducts?.length > 0 ? (
              <>
                <Row gutter={[16, 16]}>
                  {currentProducts?.length &&
                    currentProducts?.map((product: any) => (
                      <Col xs={24} sm={12} md={8} key={product.id}>
                        {" "}
                        <ProductCard
                          product={{
                            id: product?.id,
                            name: product?.name,
                            image: product?.images[0]?.url,
                            price: product?.price,
                            discountedPrice: product?.discount,
                            average_rating: product?.average_rating,
                            is_favorite: product?.is_favorite,
                            favorite_id: product?.favorite_id,
                          }}
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
              <Empty description="Không tìm thấy sản phẩm nào" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListProduct;

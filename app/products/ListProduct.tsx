"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getTopSell } from "../util/api";

const ListProduct = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getTopSell()) as any;
      if (!res?.message) {
        setProducts(res);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="product_taital">BESTSELLERS</h1>
            <p className="product_text">
              ✨Nail Box siêu xinh - cho nàng lung linh✨
            </p>
          </div>
        </div>
        <div className="row product_section_2 layout_padding">
          {products?.map((p: any) => (
            <Product
              key={p.id}
              id={p.id}
              name={p.name}
              category={p.category}
              image={p.images[0]}
              price={p.price}
              discount={p.discount | 0}
              is_favorite={p.is_favorite}
              favorite_id={p.favorite_id}
              setProducts={setProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

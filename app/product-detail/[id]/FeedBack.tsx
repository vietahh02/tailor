// app/reviews/page.tsx
"use client";
import { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { getAllReviewApi } from "../../util/api";
import { Empty } from "antd";

const ReviewsPage = ({ id }: { id: number }) => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllReviewApi(id);
      setReviews(res);
    };
    fetchData();
  }, []);

  return (
    <div className="" style={{ fontSize: 25 }}>
      <h1 className="text-2xl font-bold mb-4">Đánh giá khách hàng</h1>
      {reviews && reviews?.length ? (
        reviews?.map((review, index) => <ReviewItem key={index} {...review} />)
      ) : (
        <Empty description="Chưa có đánh giá hãy là người đầu tiên đánh giá sản phẩm của bọn mình nhé" />
      )}
    </div>
  );
};

export default ReviewsPage;

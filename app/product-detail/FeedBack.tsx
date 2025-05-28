// app/reviews/page.tsx
"use client";
import ReviewItem from "./ReviewItem";

export default function ReviewsPage() {
  const reviews = [
    {
      avatar: "",
      username: "thchxdch",
      rating: 5,
      date: "2023-10-17 07:36",
      images: ["", ""],
      comment: "",
    },
    {
      avatar: "",
      username: "phuchuong12huan",
      rating: 5,
      date: "2024-07-12 11:47",
      images: ["", ""],
      comment:
        "Shop gói hàng cẩn thận, giao hàng nhanh, đặt hàng 1 hôm là nhận được rồi, cảm thử nước sôi nhanh, không kêu to, hàng rất ok nhé mọi người",
    },
  ];

  return (
    <div className="max-w-3xl  " style={{ fontSize: 25 }}>
      <h1 className="text-2xl font-bold mb-4">Đánh giá khách hàng</h1>
      {reviews.map((review, index) => (
        <ReviewItem key={index} {...review} />
      ))}
    </div>
  );
}

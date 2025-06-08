// components/ReviewItem.tsx
// import Image from "next/image";

import { Image } from "antd";

interface Review {
  avatar?: string;
  user_name: string;
  rating: number;
  created_at: string;
  images?: string[];
  comment?: string;
}

export default function ReviewItem({
  avatar,
  user_name,
  rating,
  created_at,
  images,
  comment,
}: Review) {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center ml-10">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-2">
          {avatar && <Image src={avatar} alt="avatar" width={40} height={40} />}
        </div>
        <div>
          <p style={{ padding: 0, margin: 0 }} className="font-medium">
            {user_name}
          </p>
          <p
            style={{ padding: 0, margin: 0 }}
            className="text-sm text-gray-500"
          >
            {created_at}
          </p>
        </div>
      </div>

      <div className="flex text-yellow-400 ml-10">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      {comment && (
        <p
          className="text-gray-800 ml-10"
          style={{
            padding: 0,
            margin: 0,
            paddingBottom: 10,
            marginLeft: 40,
          }}
        >
          <strong>Nhận xét:</strong> {comment}
        </p>
      )}

      <div className="d-flex gap-2 flex-wrap ml-10">
        {images?.map((img: any, idx: number) => (
          <div key={idx} className="relative w-24 h-24">
            <Image src={img.url} width={96} height={96} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

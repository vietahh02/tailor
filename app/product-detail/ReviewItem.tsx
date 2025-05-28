// components/ReviewItem.tsx
import Image from "next/image";

interface Review {
  avatar?: string;
  username: string;
  rating: number;
  date: string;
  images?: string[];
  comment?: string;
}

export default function ReviewItem({
  avatar,
  username,
  rating,
  date,
  images,
  comment,
}: Review) {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-2">
          {avatar && <Image src={avatar} alt="avatar" width={40} height={40} />}
        </div>
        <div>
          <p className="font-medium">{username}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <div className="flex text-yellow-400">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      {comment && (
        <p className="text-sm text-gray-800">
          <strong>Nhận xét:</strong> {comment}
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {images?.map((img, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <Image src={img} width={96} height={96} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

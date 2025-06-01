import React from "react";

const Description = ({ des }: { des: string }) => {
  return (
    <div className="pd-description">
      <p>
        <strong>Mô tả: </strong> {des}
      </p>
      <p>
        <strong>LƯU Ý:</strong> Một bộ chứa 10 móng giả + 1 HDSD + 1 Lọ Gel Dán
        + 1 Set Bảng Dính Dán
      </p>
      <p>
        <strong>QUAN TRỌNG:</strong> Vui lòng đảm bảo kích thước móng của bạn là
        chính xác vì chúng tôi không chịu trách nhiệm nếu bộ móng có kích thước
        sai...
      </p>

      <p>
        Được ra đời từ năm 2018, Nailbox được thành lập để đáp ứng xu hướng làm
        đẹp mới... <br />
        ...Nailbox hiện đã phục vụ hơn 10000 bộ móng, hơn 50000 lượt theo dõi
        trên Instagram...
      </p>

      <p>
        Đặt hàng trực tiếp trên website này hoặc liên hệ với chúng tôi qua:
        <br />
        Instagram: https://www.instagram.com/
        <br />
        Facebook: https://www.facebook.com/
      </p>
    </div>
  );
};

export default Description;

"use client";

import { useState, useEffect } from "react";
import { Checkbox, Radio, Row, Col, Divider } from "antd";
import "antd/dist/reset.css";
import ListProduct from "./ListProduct";
import { useSearchParams } from "next/navigation";

const mockProducts = [
  { id: 1, name: "Nail Style A", tags: ["trẻ trung", "văn phòng"] },
  { id: 2, name: "Nail Style B", tags: ["sang trọng", "đi tiệc"] },
  { id: 3, name: "Nail Style C", tags: ["dễ thương", "sinh viên"] },
];

export default function NailFilterPage() {
  // ==== FILTER STATE ====
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [length, setLength] = useState<string | null>(null);
  const [type, setType] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<string[]>([]);
  const [condition, setCondition] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [specialOccasions, setSpecialOccasions] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);

  // ==== LOAD SAVED FILTER ====
  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedStyles(parsed.selectedStyles || []);
      setSelectedJobs(parsed.selectedJobs || []);
      setColors(parsed.colors || []);
      setPatterns(parsed.patterns || []);
      setLength(parsed.length || null);
      setType(parsed.type || []);
      setPurpose(parsed.purpose || []);
      setCondition(parsed.condition || []);
      setSeasons(parsed.seasons || []);
      setSpecialOccasions(parsed.specialOccasions || []);
      setBudget(parsed.budget || null);
    }
  }, []);

  // ==== SAVE FILTER ====
  useEffect(() => {
    const filters = {
      selectedStyles,
      selectedJobs,
      colors,
      patterns,
      length,
      type,
      purpose,
      condition,
      seasons,
      specialOccasions,
      budget,
    };
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [
    selectedStyles,
    selectedJobs,
    colors,
    patterns,
    length,
    type,
    purpose,
    condition,
    seasons,
    specialOccasions,
    budget,
  ]);

  const searchParams = useSearchParams();
  const s = searchParams.get("s") || "";

  const filterProducts = () => {
    return mockProducts.filter((p) =>
      selectedStyles.concat(selectedJobs).some((tag) => p.tags.includes(tag))
    );
  };

  return (
    <div className="container">
      {s && (
        <h3 style={{ marginTop: 20 }}>
          kết quả tìm kiếm từ: <strong>{s}</strong>
        </h3>
      )}
      <div className="container" style={{ display: "flex", padding: 20 }}>
        {/* FILTER COLUMN */}
        <div style={{ width: 300, marginRight: 20 }}>
          <h3>🧍‍♀️ Thông tin cá nhân & sở thích</h3>

          <Divider plain>Phong cách yêu thích</Divider>
          <Checkbox.Group
            value={selectedStyles}
            options={[
              "Nữ tính / dịu dàng",
              "Cá tính / nổi bật",
              "Tối giản / thanh lịch",
              "Sang trọng / quý phái",
              "Dễ thương / năng động",
            ]}
            onChange={(val) => setSelectedStyles(val as string[])}
          />

          <Divider plain>Nghề nghiệp</Divider>
          <Checkbox.Group
            value={selectedJobs}
            options={[
              "Văn phòng",
              "Nghệ thuật",
              "Sinh viên",
              "Lao động tay chân",
              "Tự do",
            ]}
            onChange={(val) => setSelectedJobs(val as string[])}
          />

          <Divider plain>🎨 Thẩm mỹ & nhu cầu</Divider>
          <Checkbox.Group
            value={colors}
            options={["Đỏ", "Hồng", "Xanh", "Vàng", "Tím", "Đen", "Trắng"]}
            onChange={(val) => setColors(val as string[])}
          />

          <Divider plain>Họa tiết</Divider>
          <Checkbox.Group
            value={patterns}
            options={[
              "Hoa lá",
              "Hoạt hình",
              "Đá",
              "Kim tuyến",
              "Trơn",
              "Vẽ tay",
            ]}
            onChange={(val) => setPatterns(val as string[])}
          />

          <Divider plain>Độ dài móng</Divider>
          <Radio.Group
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <Radio value="Ngắn">Ngắn</Radio>
            <Radio value="Trung bình">Trung bình</Radio>
            <Radio value="Dài">Dài</Radio>
          </Radio.Group>

          <Divider plain>Loại móng</Divider>
          <Checkbox.Group
            value={type}
            options={["Móng thật", "Móng úp", "Móng gel", "Móng bột"]}
            onChange={(val) => setType(val as string[])}
          />

          <Divider plain>Mục đích làm móng</Divider>
          <Checkbox.Group
            value={purpose}
            options={["Đi chơi", "Đi làm", "Du lịch", "Dịp đặc biệt"]}
            onChange={(val) => setPurpose(val as string[])}
          />

          <Divider plain>Tình trạng móng</Divider>
          <Checkbox.Group
            value={condition}
            options={["Móng yếu", "Móng khoẻ", "Có móng giả"]}
            onChange={(val) => setCondition(val as string[])}
          />

          <Divider plain>📅 Thời gian & xu hướng</Divider>
          <Checkbox.Group
            value={seasons}
            options={["Xuân", "Hè", "Thu", "Đông"]}
            onChange={(val) => setSeasons(val as string[])}
          />

          <Divider plain>Dịp đặc biệt</Divider>
          <Checkbox.Group
            value={specialOccasions}
            options={["Valentine", "Giáng sinh", "Tết"]}
            onChange={(val) => setSpecialOccasions(val as string[])}
          />

          <Divider plain>Ngân sách</Divider>
          <Radio.Group
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <Radio value="<200K">&lt;200K</Radio>
            <Radio value="200–400K">200–400K</Radio>
            <Radio value=">400K">400K+</Radio>
          </Radio.Group>
        </div>

        {/* PRODUCT DISPLAY COLUMN */}
        <div style={{ flex: 1 }}>
          <h3>Sản phẩm gợi ý</h3>
          <Row gutter={[16, 16]}>
            {filterProducts().map((product) => (
              <Col key={product.id} span={8}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <h4>{product.name}</h4>
                  <p>Tags: {product.tags.join(", ")}</p>
                </div>
              </Col>
            ))}
            <ListProduct />
          </Row>
        </div>
      </div>
    </div>
  );
}

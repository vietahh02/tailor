"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Checkbox, Row, Divider, Input } from "antd";
import ListProduct from "./ListProduct";
import "./search.css";

const { Search } = Input;

export default function SearchContent() {
  const searchParams = useSearchParams();

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [length, setLength] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<string[]>([]);
  const [specialOccasions, setSpecialOccasions] = useState<string[]>([]);
  const [search, setSearch] = useState<string>(searchParams.get("s") || "");

  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedStyles(parsed.selectedStyles || []);
      setSelectedJobs(parsed.selectedJobs || []);
      setPatterns(parsed.patterns || []);
      setLength(parsed.length || []);
      setPurpose(parsed.purpose || []);
      setSpecialOccasions(parsed.specialOccasions || []);
    }
  }, []);

  useEffect(() => {
    const filters = {
      selectedStyles,
      selectedJobs,
      patterns,
      length,
      purpose,
      specialOccasions,
    };
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [
    selectedStyles,
    selectedJobs,
    patterns,
    length,
    purpose,
    specialOccasions,
  ]);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="container">
      <Search
        placeholder="Nhập từ khóa..."
        className="mt-4"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        defaultValue={search}
      />
      {search && (
        <h3 style={{ marginTop: 20 }}>
          kết quả tìm kiếm từ: <strong>{search}</strong>
        </h3>
      )}

      <div className="container responsive-columns" style={{ padding: 20 }}>
        {/* FILTER COLUMN */}
        <div style={{ width: 250, marginRight: 20 }}>
          <h3>
            <strong>Thông tin cá nhân & sở thích</strong>
          </h3>

          <Divider plain>
            <strong>
              {" "}
              <strong>Phong cách yêu thích</strong>{" "}
            </strong>
          </Divider>
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

          <Divider plain>
            {" "}
            <strong>Nghề nghiệp</strong>
          </Divider>
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

          <Divider plain>
            {" "}
            <strong>Họa tiết</strong>
          </Divider>
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

          <Divider plain>
            <strong>Độ dài móng</strong>{" "}
          </Divider>
          <Checkbox.Group
            options={["Ngắn", "Trung bình", "Dài"]}
            value={length}
            onChange={(checkedValues) => setLength(checkedValues)}
          />

          <Divider plain>
            <strong>Mục đích làm móng</strong>{" "}
          </Divider>
          <Checkbox.Group
            value={purpose}
            options={["Đi chơi", "Đi làm", "Du lịch", "Dịp đặc biệt"]}
            onChange={(val) => setPurpose(val as string[])}
          />

          <Divider plain>
            <strong>Dịp đặc biệt</strong>
          </Divider>
          <Checkbox.Group
            value={specialOccasions}
            options={["Valentine", "Giáng sinh", "Tết"]}
            onChange={(val) => setSpecialOccasions(val as string[])}
          />
        </div>
        {/* PRODUCT DISPLAY COLUMN */}
        <div style={{ flex: 1 }}>
          <h3>Sản phẩm</h3>
          <Row gutter={[16, 16]}>
            <ListProduct
              search={search}
              selectedStyles={selectedStyles}
              selectedJobs={selectedJobs}
              patterns={patterns}
              length={length}
              purpose={purpose}
              specialOccasions={specialOccasions}
            />
          </Row>
        </div>
      </div>
    </div>
  );
}

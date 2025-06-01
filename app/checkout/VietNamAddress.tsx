"use client";

import { Cascader, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";

interface AddressOption {
  label: string;
  value: string;
  children?: AddressOption[];
}

type FormDataType = {
  fullName: string;
  phone: string;
  address: string[];
  address2: string;
  note: string;
  feeShip: number;
  image: File | null;
};

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<FormDataType>;
};

const AddressSelector = ({ formData, setFormData }: Props) => {
  const [options, setOptions] = useState<AddressOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await fetch("https://provinces.open-api.vn/api/p/");
      const provinces = await res.json();

      const formatted = provinces.map((prov: any) => ({
        label: prov.name,
        value: prov.code.toString(),
        isLeaf: false,
      }));

      setOptions(formatted);
      setLoading(false);
    };

    fetchProvinces();
  }, []);

  // Load quận/huyện và xã/phường khi người dùng chọn tỉnh
  const loadData = async (selectedOptions: AddressOption[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // Lấy quận/huyện của tỉnh
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${targetOption.value}?depth=2`
    );
    const data = await res.json();

    targetOption.loading = false;
    targetOption.children = data.districts.map((d: any) => ({
      label: d.name,
      value: d.code.toString(),
      isLeaf: false,
    }));

    setOptions([...options]);
  };

  // Load xã/phường của quận/huyện
  const loadWardData = async (selectedOptions: AddressOption[]) => {
    const parent = selectedOptions[selectedOptions.length - 2];
    const district = selectedOptions[selectedOptions.length - 1];
    district.loading = true;

    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${district.value}?depth=2`
    );
    const data = await res.json();

    district.loading = false;
    district.children = data.wards.map((w: any) => ({
      label: w.name,
      value: w.code.toString(),
      isLeaf: true,
    }));

    setOptions([...options]);
  };

  const handleLoadData = async (selectedOptions: AddressOption[]) => {
    if (selectedOptions.length === 1) {
      await loadData(selectedOptions); // load quận/huyện
    } else if (selectedOptions.length === 2) {
      await loadWardData(selectedOptions); // load xã/phường
    }
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Cascader
          size="large"
          options={options}
          loadData={handleLoadData}
          changeOnSelect
          placeholder="Chọn địa chỉ"
          onChange={(value, selectedOptions) => {
            setFormData({
              ...formData,
              address: selectedOptions.map((option) => option.label),
            });
            console.log("Selected:", selectedOptions);
          }}
          style={{
            width: "100%",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        />
      )}
    </>
  );
};

export default AddressSelector;

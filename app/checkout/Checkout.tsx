"use client";

import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { Button, Form, Image, Input, Modal, Upload, UploadFile } from "antd";
import AddressSelector from "./VietNamAddress";
import { toast } from "react-toastify";
import { clearCartApi, createOrderApi, getAllCartApi } from "../util/api";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth.context";
// import "../assets/images/do-mong-tien-2-1.jpg"

const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: [] as string[],
    address2: "",
    note: "",
    images: [] as File[],
    feeShip: 0,
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [carts, setCarts] = useState<any>(null);

  const router = useRouter();
  const { setNumberCart } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getAllCartApi();
        setCarts(res);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Form data updated:", { ...formData, [name]: value });
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);

    const files = fileList
      .map((file) => file.originFileObj)
      .filter(Boolean) as File[];

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleRemove = (file: UploadFile) => {
    const newList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newList);

    const remainingFiles = newList
      .map((file) => file.originFileObj)
      .filter(Boolean) as File[];

    setFormData((prev) => ({
      ...prev,
      images: remainingFiles,
    }));
  };

  const handleImagePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreviewImage(src);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Ảnh xem trước");
  };

  const [visible, setVisible] = useState(false);
  const handlePreview = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  function getShippingFee(locations: string[]): number {
    const combined = locations.join(" ");

    if (combined.includes("Thạch Thất")) {
      return 0;
    } else if (combined.includes("Hà Nội")) {
      return 15000;
    } else {
      return 30000;
    }
  }

  const handleSubmit = async () => {
    if (
      formData.fullName === "" ||
      formData.address.length < 3 ||
      formData.phone === ""
    ) {
      toast.error("Hãy nhập đầy đủ thông tin");
      return;
    }
    const res = (await createOrderApi(
      JSON.stringify({
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        shipping_address:
          (formData.address2 && formData.address2 + ", ") +
          formData.address.reverse().join(", "),
        shipping_fee: formData.feeShip,
        note: formData.note,
        items: carts?.items?.map((i: any) => {
          return {
            product_id: i.product_id,
            quantity: i.quantity,
            price: i.product.price,
          };
        }),
      }),
      formData.images
    )) as any;
    if (res.message === "successful") {
      await clearCartApi();
      toast.success("Đặt hàng thành công");
      setNumberCart(0);
      router.push("/order");
    } else {
      toast.error("Hãy đăng nhập để đặt hàng");
    }
  };

  function calculateTotal(): string {
    const total = carts?.items?.reduce((sum: any, item: any) => {
      const { quantity, product } = item;
      const discountedPrice = product.price * (1 - product.discount / 100);
      return sum + quantity * discountedPrice;
    }, 0);

    return total;
  }

  return (
    <div className="container ck-container">
      <Form className="ck-form-section" layout="vertical">
        <h2>Thông tin khách hàng</h2>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input
            size="large"
            name="fullName"
            placeholder="Nhập họ tên"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại phải gồm 10 chữ số",
            },
          ]}
        >
          <Input
            size="large"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ" required>
          <AddressSelector formData={formData} setFormData={setFormData} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ cụ thể"
          name="address2"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
        >
          <Input
            size="large"
            name="address2"
            placeholder="Nhập địa chỉ"
            value={formData.address2}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Upload ảnh với preview và xóa */}
        <Form.Item label="Ảnh size móng">
          <div style={{ marginBottom: 8 }}>
            <Button type="primary" onClick={handlePreview}>
              Hướng dẫn đo móng
            </Button>
          </div>
          <Upload
            listType="picture-card"
            multiple
            accept="image/*"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            onPreview={handleImagePreview}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>

        <Form.Item label="Ghi chú (tuỳ chọn)" name="note">
          <Input.TextArea
            name="note"
            placeholder="Nhập ghi chú nếu có"
            value={formData.note}
            onChange={handleChange}
            rows={4}
          />
        </Form.Item>
      </Form>

      {/* Order summary */}
      <div className="ck-summary-section">
        <h2>Đơn hàng của bạn</h2>
        <table className="ck-summary-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {carts?.items.map((c: any) => (
              <tr key={c.id}>
                <td>{c.product.name}</td>
                <td className="text-center">{c.quantity}</td>
                <td>
                  {(
                    c.product.price -
                    (c.product.price * c.product.discount) / 100
                  )?.toLocaleString()}{" "}
                  đ
                </td>
                <td>
                  {(
                    (c.product.price -
                      (c.product.price * c.product.discount) / 100) *
                    c.quantity
                  )?.toLocaleString()}{" "}
                  đ
                </td>
              </tr>
            ))}
            <tr>
              <td>Subtotal</td>
              <td></td>
              <td></td>
              <td>{calculateTotal()?.toLocaleString()} đ</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td></td>
              <td></td>
              <td>
                {getShippingFee(formData.address) === 0
                  ? "Free Shipping"
                  : getShippingFee(formData.address)?.toLocaleString() + " đ"}
              </td>
            </tr>
            <tr>
              <td>Tổng</td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  {(
                    getShippingFee(formData.address) + calculateTotal()
                  )?.toLocaleString()}{" "}
                  đ
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="ck-privacy-text">
          Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và tăng
          trải nghiệm sử dụng website của chúng tôi.
        </p>

        <button
          className="ck-place-order btn btn-primary"
          onClick={handleSubmit}
        >
          Đặt hàng
        </button>
      </div>

      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={null}
        title="Xem ảnh"
      >
        <Image
          width="100%"
          src="https://res.cloudinary.com/dlpcempww/image/upload/v1749140128/ykjcszkctddhlh1ijbgs.jpg"
          alt="Ảnh mẫu"
        />
      </Modal>
    </div>
  );
};

export default CheckoutPage;

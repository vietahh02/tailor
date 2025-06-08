import axios from "./axios.customize";

const getAllUsers = () => {
  return axios.get("/users/get-all-users");
};

const changeRole = (id: number, role: string) => {
  return axios.patch(`/users/${id}/role?role=${role}`);
};

const changeStatus = (id: number, status: string) => {
  return axios.patch(`/users/${id}/status?status=${status}`);
};

const createProduct = (
  name: string,
  price: number,
  category: string,
  description?: string,
  discount?: number,
  images?: File[],
  job?: string,
  pattern?: string,
  nail_length?: string,
  purpose?: string,
  occasion?: string,
  imageAr?: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("category", category);

  if (description) formData.append("description", description);
  if (job) formData.append("job", job);
  if (pattern) formData.append("pattern", pattern);
  if (nail_length) formData.append("nail_length", nail_length);
  if (purpose) formData.append("purpose", purpose);
  if (occasion) formData.append("occasion", occasion);
  if (discount !== undefined) formData.append("discount", discount.toString());

  if (images && images.length > 0) {
    images.forEach((img: File) => {
      formData.append("images", img);
    });
  }
  if (imageAr) {
    formData.append("imageAr", imageAr);
  }

  return axios.post("/products/create-product", formData);
};
const updateProductApi = (
  id: number,
  name: string,
  price: number,
  category: string,
  description?: string,
  discount?: number,
  images?: File[],
  job?: string,
  pattern?: string,
  nail_length?: string,
  purpose?: string,
  occasion?: string,
  delete_image_ids?: string,
  imageAr?: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("category", category);

  if (description) formData.append("description", description);
  if (job) formData.append("job", job);
  if (pattern) formData.append("pattern", pattern);
  if (nail_length) formData.append("nail_length", nail_length);
  if (purpose) formData.append("purpose", purpose);
  if (occasion) formData.append("occasion", occasion);
  if (delete_image_ids) formData.append("delete_image_ids", delete_image_ids);

  if (discount !== undefined) formData.append("discount", discount.toString());

  if (images && images.length > 0) {
    images.forEach((img: File) => {
      formData.append("images", img);
    });
  }

  if (imageAr) {
    formData.append("imageAr", imageAr);
  }

  return axios.put(`/products/update-product/${id}`, formData);
};

const deleteProduct = (id: number) => {
  return axios.delete(`/products/delete-product/${id}`);
};

const getAllOrderForAdmin = () => {
  return axios.get("/orders/get-all-orders");
};

export {
  getAllUsers,
  changeRole,
  changeStatus,
  createProduct,
  deleteProduct,
  updateProductApi,
  getAllOrderForAdmin,
};

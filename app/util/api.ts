import axios from "./axios.customize";

const createUserApi = (
  email: string,
  userName: string,
  phone: string,
  password: string
  // address?: string
) => {
  return axios.post("/register", {
    email,
    user_name: userName,
    full_name: "",
    phone,
    password,
    role: "user",
    address: "",
  });
};
const loginApi = (user_name: string, password: string) => {
  return axios.post("/login", {
    user_name,
    password,
  });
};

const forgetPasswordApi = (email: string) => {
  return axios.post("/forgot-password", {
    email: email,
  });
};

const restPasswordApi = (
  email: string,
  otp_code: string,
  new_password: string
) => {
  return axios.post("/reset-password", {
    email,
    otp_code,
    new_password,
  });
};

const changePasswordApi = (oldPass: string, newPass: string) => {
  return axios.post("/change-password", {
    old_password: oldPass,
    new_password: newPass,
  });
};
// {
//     "message": "successful"
// }

const logoutApi = () => {
  return axios.get("/logout");
};

const getAllProduct = () => {
  return axios.get("/products/get-list-products");
};

const getProductById = (id: number) => {
  return axios.get(`/products/${id}`);
};

const updateUser = (
  id: number,
  email?: string,
  phone?: string,
  address?: string,
  image?: File,
  full_name?: string
) => {
  const formData = new FormData();

  if (email) formData.append("email", email);
  if (phone) formData.append("phone", phone);
  if (address) formData.append("address", address);
  if (full_name) formData.append("full_name", full_name);
  if (image) formData.append("image", image);

  return axios.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const addToCartApi = (productId: number, quantity: number) => {
  return axios.post("/carts/add-to-cart", {
    product_id: productId,
    quantity: quantity,
  });
};

const removeCartApi = (id: number) => {
  return axios.delete(`/carts/remove-cart/${id}`);
};

const getAllCartApi = () => {
  return axios.get("/carts/list-cart");
};

const updateQuantityCartApi = (id: number, quantity: number) => {
  return axios.put("/carts/update-quantity", {
    product_id: id,
    quantity: quantity,
  });
};

const clearCartApi = () => {
  return axios.delete("/carts/clear-cart");
};

const getAllFavoriteApi = () => {
  return axios.get("/favorites/get-list-favorite");
};

const getTopSell = () => {
  return axios.get("/products/top-rented");
};
const getAllOrderUser = () => {
  return axios.get("/users/list-orders");
};

const createOrderApi = (order_data: string, images?: File[] | null) => {
  const formData = new FormData();
  formData.append("order_data", order_data);
  images?.forEach((image) => {
    formData.append("images", image);
  });

  return axios.post("/orders/create-order", formData);
};

const changeStatusOrderApi = (id: number, status: string) => {
  return axios.put(`/orders/${id}/status`, {
    status,
  });
};

const getAllReviewApi = (id: number) => {
  return axios.get(`/reviews/product/${id}`);
};

const getAllReviewForOrder = (idOrder: number) => {
  return axios.get(`/orders/${idOrder}/review-status`);
};

const createNewReviewApi = (
  product_id: number,
  rating: number,
  comment?: string,
  images?: File[]
) => {
  const formData = new FormData();
  formData.append("product_id", product_id.toString());
  formData.append("rating", rating.toString());

  if (comment) {
    formData.append("comment", comment);
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return axios.post("/reviews/create-review", formData);
};

const updateReviewApi = (
  review_id: number,
  rating: number,
  comment?: string,
  image_ids_to_delete?: string,
  images?: File[]
) => {
  const formData = new FormData();
  formData.append("rating", rating.toString());

  if (comment) {
    formData.append("comment", comment);
  }

  if (image_ids_to_delete) {
    formData.append("image_ids_to_delete", image_ids_to_delete);
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return axios.put(`/reviews/update-review/${review_id}`, formData);
};

const addNewFavoriteApi = (id: number) => {
  return axios.post("/favorites/create-favorite", {
    product_id: id,
  });
};

const removeFavoriteApi = (id: number) => {
  return axios.delete(`/favorites/delete-favorite/${id}`);
};

const getInfoUser = () => {
  return axios.get("/info-user");
};

export {
  createUserApi,
  loginApi,
  getAllProduct,
  getProductById,
  getInfoUser,
  updateUser,
  addToCartApi,
  removeCartApi,
  getAllCartApi,
  getAllFavoriteApi,
  updateQuantityCartApi,
  addNewFavoriteApi,
  removeFavoriteApi,
  getTopSell,
  getAllOrderUser,
  getAllReviewApi,
  createNewReviewApi,
  updateReviewApi,
  createOrderApi,
  changeStatusOrderApi,
  getAllReviewForOrder,
  clearCartApi,
  logoutApi,
  forgetPasswordApi,
  changePasswordApi,
  restPasswordApi,
};

import axios from "axios";
import NProgress from "nprogress";

const instance = axios.create({
  baseURL: process.env.VITE_BACKEND_URL || "https://server.fotofit.site/api/v1",
});

let requestCount = 0;

const startProgress = () => {
  if (requestCount === 0) NProgress.start();
  requestCount++;
};

const stopProgress = () => {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    NProgress.done();
  }
};

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    startProgress();

    config.headers.Authorization = `Bearer ${
      localStorage.getItem("access_token") || ""
    }`;

    return config;
  },
  function (error) {
    stopProgress();
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    stopProgress();

    return response?.data ?? response;
  },
  function (error) {
    stopProgress();

    if (error?.response?.data) return error?.response?.data;
    return Promise.reject(error);
  }
);

export default instance;

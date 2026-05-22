import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token && config) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return config
})


// Products Approval APIs
export const getPendingProducts = async ({ vendor, category, status }) => {
  const params = {};
  if (vendor) params.vendor = vendor;
  if (category) params.category = category;
  if (status) params.status = status;
  const { data } = await api.get("/products/pending", { params });
  return data;
};

export const getProductDetails = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const approveProduct = async (id) => {
  const { data } = await api.post(`/products/${id}/approve`);
  return data;
};

export const rejectProduct = async (id, reason) => {
  const { data } = await api.post(`/products/${id}/reject`, { reason });
  return data;
};

export const getVendors = async () => {
  const { data } = await api.get("/vendors");
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export default api

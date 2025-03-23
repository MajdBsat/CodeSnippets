import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    ...(token && { 'Authorization': `Bearer ${token}` })
  },
});

export default axiosInstance;
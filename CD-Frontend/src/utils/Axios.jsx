import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://13.38.47.28/server/api/v1",
  headers: {
    "Content-Type": "application/json",
    ...(token && { 'Authorization': `Bearer ${token}` })
  },
});

export default axiosInstance;
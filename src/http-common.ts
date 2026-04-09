import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3001", // JsonServer API
  // baseURL: "https://localhost:7010", // ASPNET API
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

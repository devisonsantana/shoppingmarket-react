import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3001", // JsonServer API
  // baseURL: "https://localhost:7010", // ASPNET API
  baseURL: "http://shoppingmarketapi.tryasp.net",
  headers: {
    "Content-Type": "application/json",
  },
});

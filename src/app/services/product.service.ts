import http from "../../http-common";
import { ProductProps } from "../interfaces/Products";

const findAll = async (typeFilter: string) => {
  if (typeFilter) {
    // JSON SERVER Query params
    // const response = await http.get<ProductProps[]>(`products?_sort=price`);
    // return typeFilter === "desc" ? response.data.reverse() : response.data;

    // ASPNET API query params
    const response = await http.get<ProductProps[]>(
      `products?sortBy=price&sortOrder=${typeFilter}`,
    );
    return response.data;
  }
  const response = await http.get<ProductProps[]>("/products");
  return response.data;
};

const searchName = async (name: string) => {
  const response = await http.get<ProductProps[]>(`/products?name=${name}`);
  return response.data;
};

export const ProductService = {
  findAll,
  searchName,
};

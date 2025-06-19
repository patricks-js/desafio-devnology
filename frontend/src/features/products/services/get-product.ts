import type { Product } from "../types";

export async function getProduct(id: string) {
  const response = await fetch(`/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = (await response.json()) as Product;

  return data;
}

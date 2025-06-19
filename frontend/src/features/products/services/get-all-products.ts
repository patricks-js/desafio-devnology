import type { Product } from "../types";

export async function getAllProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await response.json()) as Product[];

  return data;
}

import type { ProductFilters } from "../types";

export async function getProductFilters() {
  const response = await fetch("/api/product-filters");

  if (!response.ok) {
    throw new Error("Failed to fetch filters");
  }

  const data = (await response.json()) as ProductFilters;

  return data;
}

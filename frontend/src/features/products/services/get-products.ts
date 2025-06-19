import type { Product } from "../types";

type ProductQueryFilters = {
  q?: string | null;
  category?: string | null;
  department?: string | null;
  material?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

export async function getProducts(filters: ProductQueryFilters) {
  const params = new URLSearchParams();

  console.log(filters);
  console.log(params);

  if (filters.q) params.append("q", filters.q);
  if (filters.category) params.append("categories", filters.category);
  if (filters.department) params.append("departments", filters.department);
  if (filters.material) params.append("materials", filters.material);
  if (filters.minPrice)
    params.append("minPrice", String(filters.minPrice * 100));
  if (filters.maxPrice)
    params.append("maxPrice", String(filters.maxPrice * 100));

  const queryString = params.toString();
  console.log(queryString);

  const response = await fetch(`/api/products?${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered products");
  }

  const data = (await response.json()) as Product[];

  return data;
}

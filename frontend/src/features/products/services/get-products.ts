import type { Product } from "../types";

type ProductQueryFilters = {
  q?: string | null;
  category?: string | null;
  department?: string | null;
  material?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

type PaginatedProductsResponse = {
  data: Product[];
  nextPage: number | null;
  total: number;
  hasNextPage: boolean;
  limit: number;
};

export async function getProducts({
  filters,
  page = 0,
  limit = 12,
}: {
  filters: ProductQueryFilters;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (filters.q) params.append("q", filters.q);
  if (filters.category) params.append("categories", filters.category);
  if (filters.department) params.append("departments", filters.department);
  if (filters.material) params.append("materials", filters.material);
  if (filters.minPrice)
    params.append("minPrice", String(filters.minPrice * 100));
  if (filters.maxPrice)
    params.append("maxPrice", String(filters.maxPrice * 100));

  params.append("offset", String(page));
  params.append("limit", String(limit));

  const queryString = params.toString();

  const response = await fetch(`/api/products?${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filtered products");
  }

  const data = (await response.json()) as PaginatedProductsResponse;

  return data;
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getProducts } from "../services/get-products";
import { useProductFilters } from "./use-product-filters";

export function useProducts() {
  const {
    searchTerm,
    selectedCategory,
    selectedDepartment,
    selectedMaterial,
    priceRange,
  } = useProductFilters();

  const filters = {
    q: searchTerm,
    category: selectedCategory,
    department: selectedDepartment,
    material: selectedMaterial,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  };

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => getProducts({ filters, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  return {
    products,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

import { useQuery } from "@tanstack/react-query";
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
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  return {
    products: products ?? [],
    isPending,
    error,
  };
}

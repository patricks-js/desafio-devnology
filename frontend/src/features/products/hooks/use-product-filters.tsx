import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { getProductFilters } from "../services/get-product-filters";

const MIN_PRICE_FILTER = 1;
const MAX_PRICE_FILTER = 1000;

export function useProductFilters() {
  const { data: availableFilters, isLoading: isLoadingFilters } = useQuery({
    queryKey: ["product-filters"],
    queryFn: getProductFilters,
  });

  const [searchTerm, setSearchTerm] = useQueryState("q");
  const [selectedCategory, setSelectedCategory] = useQueryState("category");
  const [selectedDepartment, setSelectedDepartment] =
    useQueryState("department");
  const [selectedMaterial, setSelectedMaterial] = useQueryState("material");
  const [priceRange, setPriceRange] = useQueryStates({
    min: parseAsInteger.withDefault(MIN_PRICE_FILTER),
    max: parseAsInteger.withDefault(MAX_PRICE_FILTER),
  });

  function clearFilter(
    key?: "category" | "department" | "material" | "priceRange",
  ) {
    switch (key) {
      case "category":
        setSelectedCategory(null);
        break;
      case "department":
        setSelectedDepartment(null);
        break;
      case "material":
        setSelectedMaterial(null);
        break;
      case "priceRange":
        setPriceRange({ min: MIN_PRICE_FILTER, max: MAX_PRICE_FILTER });
        break;
      default:
        setSelectedCategory(null);
        setSelectedDepartment(null);
        setSelectedMaterial(null);
        setPriceRange({ min: MIN_PRICE_FILTER, max: MAX_PRICE_FILTER });
        break;
    }
  }

  return {
    searchTerm,
    selectedCategory,
    selectedDepartment,
    selectedMaterial,
    priceRange,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDepartment,
    setSelectedMaterial,
    setPriceRange,
    clearFilter,
    availableFilters,
    isLoadingFilters,
  };
}

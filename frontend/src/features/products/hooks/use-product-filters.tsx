import { createContext, type ReactNode, useContext, useState } from "react";

type ProductFiltersContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const ProductFiltersContext = createContext<
  ProductFiltersContextType | undefined
>(undefined);

type ProductFiltersProviderProps = {
  children: ReactNode;
};

export function ProductFiltersProvider({
  children,
}: ProductFiltersProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const value = {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}

export function useProductFilters() {
  const context = useContext(ProductFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useProductFilters must be used within a ProductFiltersProvider",
    );
  }

  return context;
}

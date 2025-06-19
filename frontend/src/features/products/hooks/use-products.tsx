import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/get-all-products";

export const useProducts = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return {
    products: data ?? [],
    isPending,
    error,
  };
};

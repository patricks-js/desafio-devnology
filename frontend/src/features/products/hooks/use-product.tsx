import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/get-product";

export const useProduct = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => await getProduct(id),
  });

  return {
    product: data,
    isPending,
    error,
  };
};

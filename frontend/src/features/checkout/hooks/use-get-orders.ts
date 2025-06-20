import { useQuery } from "@tanstack/react-query";
import { useGuestUser } from "@/hooks/use-guest-user";
import { getAllOrders } from "../services/get-all-orders";

export const useGetOrders = () => {
  const { ensureGuestId } = useGuestUser();
  const userId = ensureGuestId();

  const { data, error, isPending } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => await getAllOrders({ userId }),
  });

  return {
    orders: data,
    isPending,
    error,
  };
};

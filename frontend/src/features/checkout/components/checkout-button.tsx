import { useNavigate } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types";
import { useCheckout } from "../hooks/use-checkout";
import type { OrderDto } from "../types";

type Props = ComponentProps<typeof Button> & {
  product?: Product;
  quantity?: number;
};

export function CheckoutButton({
  className,
  children,
  product,
  quantity = 1,
  ...props
}: Props) {
  const { isCheckingOut, processCheckout } = useCheckout();
  const navigate = useNavigate();

  async function handleCheckout() {
    try {
      let order: OrderDto | null;
      if (product) {
        order = await processCheckout([{ productId: product.id, quantity }]);
      } else {
        order = await processCheckout();
      }
      if (order) {
        toast.success("Pedido criado com sucesso");
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error("Erro ao processar o checkout:", error);
      toast.error("Erro ao processar o checkout");
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      className={className}
      disabled={isCheckingOut}
      {...props}
    >
      {isCheckingOut ? "Processando..." : children}
    </Button>
  );
}

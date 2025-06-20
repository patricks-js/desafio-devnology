import { useState } from "react";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useGuestUser } from "@/hooks/use-guest-user";
import { createOrder } from "../services/create-order";
import type { OrderDto } from "../types";

export function useCheckout() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { cart, clearCart } = useCart();
  const ensureGuestId = useGuestUser((state) => state.ensureGuestId);

  async function processCheckout(
    itemsOverride?: { productId: string; quantity: number }[],
  ): Promise<OrderDto | null> {
    const items =
      itemsOverride ??
      cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

    if (items.length === 0) {
      console.error("Carrinho vazio, checkout não pode continuar.");
      return null;
    }

    const customerId = ensureGuestId();

    if (!customerId) {
      console.error(
        "Não foi possível obter ou criar um ID de cliente para o checkout.",
      );
      throw new Error("ID de cliente inválido. Tente recarregar a página.");
    }

    setIsCheckingOut(true);

    try {
      const orderPayload = {
        customerId,
        items,
      };

      const createdOrder = await createOrder(orderPayload);
      if (!itemsOverride) clearCart();
      return createdOrder;
    } catch (error) {
      console.error("Falha ao processar o checkout:", error);
      throw error;
    } finally {
      setIsCheckingOut(false);
    }
  }

  return {
    isCheckingOut,
    processCheckout,
  };
}

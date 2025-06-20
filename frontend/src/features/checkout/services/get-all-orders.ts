import type { OrderResponse } from "../types";

export async function getAllOrders({
  userId,
}: {
  userId: string;
}): Promise<OrderResponse[]> {
  const response = await fetch(`/api/orders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao criar o pedido.");
  }

  return response.json();
}

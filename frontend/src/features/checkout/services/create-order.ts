import type { CreateOrderDto, OrderDto } from "../types";

export async function createOrder(payload: CreateOrderDto): Promise<OrderDto> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar o pedido.");
  }

  return response.json();
}

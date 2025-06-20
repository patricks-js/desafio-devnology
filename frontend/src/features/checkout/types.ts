type OrderItem = {
  productId: string;
  quantity: number;
};

export type CreateOrderDto = {
  customerId: string;
  items: OrderItem[];
};

export type OrderDto = {
  id: number;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
};

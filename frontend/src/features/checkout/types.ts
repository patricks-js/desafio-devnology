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

export type OrderResponse = {
  createdAt: string;
  customerId: string;
  id: number;
  items: {
    product: {
      id: string;
      name: string | null;
      price: number;
    };
    quantity: number;
    subtotal: number;
  }[];
  status: string;
  totalAmount: number;
};

import { ProductDTO } from "@/modules/providers/dtos/product.dto";

class OrderItemDetailsDto {
  product: ProductDTO;
  quantity: number;
  subtotal: number;
}

export class OrderDto {
  id: number;
  customerId: string;
  items: OrderItemDetailsDto[];
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

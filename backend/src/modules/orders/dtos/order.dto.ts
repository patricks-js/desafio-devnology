import { ProductDTO } from "@/modules/providers/dtos/product.dto";

class OrderItemDetailsDto {
  product: ProductDTO;
  quantity: number;
  subtotal: number;
}

export class OrderDto {
  id: string;
  items: OrderItemDetailsDto[];
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  createdAt: Date;
}

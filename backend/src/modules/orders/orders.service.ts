import { ProductsService } from "@/modules/products/services/products.service";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrderDto } from "./dtos/order.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAll() {
    // TODO: Pagination, filtering, sorting
    // For now, just return all orders
    return [];
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException("Order must have at least one item.");
    }

    let totalAmount = 0;

    const orderItemsDetails = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productsService.getProductById(
          item.productId,
        );

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        return {
          product,
          quantity: item.quantity,
          subtotal,
        };
      }),
    );

    const newOrder: OrderDto = {
      id: randomUUID(),
      items: orderItemsDetails,
      totalAmount,
      status: "PENDING",
      createdAt: new Date(),
    };

    return newOrder;
  }
}

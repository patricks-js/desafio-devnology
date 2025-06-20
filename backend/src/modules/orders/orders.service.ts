import { ProductsService } from "@/modules/products/services/products.service";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductDTO } from "../providers/dtos/product.dto";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrderDto } from "./dtos/order.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAllByCustomer(customerId: string) {
    const orders = await this.prismaService.order.findMany({
      where: {
        customerId,
      },
      include: {
        OrderItem: true,
      },
    });

    return orders.map((order) => ({
      id: order.id,
      customerId: order.customerId,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.OrderItem.map((item) => ({
        product: {
          id: item.productId,
          name: item.productName,
          price: item.price,
        },
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
    }));
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const products = await this.validateOrderItems(createOrderDto);
    let totalAmount = 0;

    const orderItemsData = products.map((product) => {
      const subtotal = product.price * product.quantity;
      totalAmount += subtotal;

      return {
        productId: product.id,
        productName: product.name,
        quantity: product.quantity,
        price: product.price,
        subtotal,
      };
    });

    const createdOrder = await this.prismaService.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerId: createOrderDto.customerId,
          totalAmount,
          status: "PENDING",
          OrderItem: {
            create: orderItemsData,
          },
        },
      });

      const orderItems = await tx.orderItem.findMany({
        where: { orderId: order.id },
      });

      return {
        order,
        orderItems,
      };
    });

    const orderDto: OrderDto = {
      id: createdOrder.order.id,
      customerId: createdOrder.order.customerId,
      status: createdOrder.order.status,
      totalAmount: createdOrder.order.totalAmount,
      createdAt: createdOrder.order.createdAt,
      items: createdOrder.orderItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);

        if (!product) {
          throw new Error(
            `Product ID ${item.productId} not found in DTO assembly`,
          );
        }

        return {
          product,
          quantity: item.quantity,
          subtotal: item.subtotal,
        };
      }),
    };

    return orderDto;
  }

  private async validateOrderItems({ items }: CreateOrderDto) {
    if (!items || items.length === 0) {
      throw new BadRequestException("Order must have at least one item.");
    }

    const productIds = items.map((item) => item.productId);
    if (productIds.length !== new Set(productIds).size) {
      throw new BadRequestException("Duplicate product IDs are not allowed.");
    }

    const foundItems = await this.productsService.getProductsByIds(productIds);

    const productsMap = new Map<string, ProductDTO>(
      foundItems.map(
        (product) => [product.id, product] as [string, ProductDTO],
      ),
    );

    const invalidProductIds = productIds.filter((id) => !productsMap.has(id));
    if (invalidProductIds.length > 0) {
      throw new BadRequestException(
        `Invalid product IDs: ${invalidProductIds.join(", ")}`,
      );
    }

    const productsWithQuantity: (ProductDTO & { quantity: number })[] =
      items.map((item) => {
        const product = productsMap.get(item.productId);
        if (!product) {
          throw new BadRequestException(
            `Product ID ${item.productId} not found.`,
          );
        }
        return {
          ...product,
          quantity: item.quantity,
        };
      });

    return productsWithQuantity;
  }
}

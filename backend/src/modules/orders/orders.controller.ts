import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(":customerId")
  getAll(@Param("customerId") customerId: string) {
    return this.ordersService.getAllByCustomer(customerId);
  }

  @Get("status/:status")
  findByStatus() {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Delete(":id")
  delete() {}
}

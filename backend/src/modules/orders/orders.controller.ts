import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAll() {
    return this.ordersService.getAll();
  }

  @Get(":id")
  findOne() {}

  @Get("status/:status")
  findByStatus() {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Delete(":id")
  delete() {}
}

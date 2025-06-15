import { Controller, Delete, Get, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    // TODO: Pagination, filtering, sorting
    // For now, just return all orders
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne() {
    return this.ordersService.findOne();
  }

  @Get("status/:status")
  findByStatus() {
    return this.ordersService.findByStatus();
  }

  @Post()
  create() {
    return this.ordersService.create();
  }

  @Delete(":id")
  delete() {
    return this.ordersService.delete();
  }
}

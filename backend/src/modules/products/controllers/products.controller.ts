import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "../services/products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productsService.getProductById(id);
  }
}

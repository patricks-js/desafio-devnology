import { Controller, Get } from "@nestjs/common";
import { ProductFiltersService } from "../services/product-filters.service";

@Controller("product-filters")
export class ProductFiltersController {
  constructor(private readonly productFiltersService: ProductFiltersService) {}

  @Get()
  async getAllFilters() {
    return this.productFiltersService.getAllFilters();
  }
}

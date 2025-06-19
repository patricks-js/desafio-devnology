import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductFiltersDTO } from "../dtos/product-filters.dto";
import { ProductsService } from "../services/products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() query: any) {
    const filters: ProductFiltersDTO = {
      q: query.q ? query.q : undefined,
      categories: query.categories ? [].concat(query.categories) : undefined,
      departments: query.departments ? [].concat(query.departments) : undefined,
      materials: query.materials ? [].concat(query.materials) : undefined,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    };

    const limit = query.limit ? Number(query.limit) : 10;
    const offset = query.offset ? Number(query.offset) : 0;

    return this.productsService.getFilteredProducts(filters, limit, offset);
  }

  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productsService.getProductById(id);
  }
}

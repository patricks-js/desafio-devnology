import { ProductDTO } from "@/modules/providers/dtos/product.dto";
import { Injectable } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductFiltersService {
  constructor(private readonly productsService: ProductsService) {}

  async getAllFilters() {
    const products = await this.productsService.getProducts();

    const categories = this.getUniqueValuesFrom(products, "category");
    const departments = this.getUniqueValuesFrom(products, "department");
    const materials = this.getUniqueValuesFrom(products, "material");

    return {
      categories,
      departments,
      materials,
    };
  }

  private getUniqueValuesFrom(
    products: ProductDTO[],
    field: keyof ProductDTO,
  ): string[] {
    const allValues = products.map((product) => product[field]).filter(Boolean);
    const stringValues = allValues.map(String);

    return Array.from(new Set(stringValues));
  }
}

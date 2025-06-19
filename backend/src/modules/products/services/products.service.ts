import { Injectable } from "@nestjs/common";
import { BrazilianProvidersService } from "../../providers/services/brazilian-providers.service";
import { EuropeanProvidersService } from "../../providers/services/european-providers.service";

@Injectable()
export class ProductsService {
  private readonly limit = 10;
  private readonly offset = 0;

  constructor(
    private readonly brazilianProvidersService: BrazilianProvidersService,
    private readonly europeanProvidersService: EuropeanProvidersService,
  ) {}

  async getProducts() {
    const [brazilianProducts, europeanProducts] = await Promise.all([
      this.brazilianProvidersService.getProducts(),
      this.europeanProvidersService.getProducts(),
    ]);

    const allProducts = [...brazilianProducts, ...europeanProducts];

    return allProducts;
  }

  async getProductById(id: string) {
    const provider = id.split("_")[1];
    const productId = id.split("_")[2];

    if (provider === "br") {
      return this.brazilianProvidersService.getProductById(productId);
    }

    return this.europeanProvidersService.getProductById(productId);
  }
}

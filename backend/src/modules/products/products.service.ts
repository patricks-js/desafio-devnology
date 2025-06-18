import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
  async getProducts() {
    return [];
  }

  async getProductById(id: string) {
    return {};
  }
}

import { Module } from "@nestjs/common";
import { ProvidersModule } from "../providers/providers.module";
import { ProductFiltersController } from "./controllers/product-filters.controller";
import { ProductsController } from "./controllers/products.controller";
import { ProductFiltersService } from "./services/product-filters.service";
import { ProductsService } from "./services/products.service";

@Module({
  imports: [ProvidersModule],
  controllers: [ProductsController, ProductFiltersController],
  providers: [ProductsService, ProductFiltersService],
  exports: [ProductsService],
})
export class ProductsModule {}

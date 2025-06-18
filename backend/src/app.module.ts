import { Module } from "@nestjs/common";
import { OrdersModule } from "./modules/orders/orders.module";
import { ProductsModule } from "./modules/products/products.module";
import { ProvidersModule } from "./modules/providers/providers.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, OrdersModule, ProductsModule, ProvidersModule],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { OrdersModule } from "./modules/orders/orders.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, OrdersModule],
})
export class AppModule {}

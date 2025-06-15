import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { OrdersRepository } from "./repositories/orders.repository";

@Global()
@Module({
  providers: [PrismaService, OrdersRepository],
  exports: [OrdersRepository],
})
export class PrismaModule {}

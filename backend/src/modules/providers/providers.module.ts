import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { BrazilianProvidersService } from "./brazilian-providers.service";
import { EuropeanProvidersService } from "./european-providers.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
  ],
  providers: [BrazilianProvidersService, EuropeanProvidersService],
  exports: [BrazilianProvidersService, EuropeanProvidersService],
})
export class ProvidersModule {}

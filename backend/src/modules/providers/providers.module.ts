import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { BrazilianProviderMapper } from "./mappers/brazilian-provider.mapper";
import { EuropeanProviderMapper } from "./mappers/european-provider.mapper";
import { BrazilianProvidersService } from "./services/brazilian-providers.service";
import { EuropeanProvidersService } from "./services/european-providers.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
  ],
  providers: [
    BrazilianProvidersService,
    EuropeanProvidersService,
    BrazilianProviderMapper,
    EuropeanProviderMapper,
  ],
  exports: [BrazilianProvidersService, EuropeanProvidersService],
})
export class ProvidersModule {}

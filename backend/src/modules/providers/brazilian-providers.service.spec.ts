import { Test, TestingModule } from '@nestjs/testing';
import { BrazilianProvidersService } from './brazilian-providers.service';

describe('BrazilianProvidersService', () => {
  let service: BrazilianProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrazilianProvidersService],
    }).compile();

    service = module.get<BrazilianProvidersService>(BrazilianProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

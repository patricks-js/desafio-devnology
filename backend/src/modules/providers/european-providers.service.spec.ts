import { Test, TestingModule } from '@nestjs/testing';
import { EuropeanProvidersService } from './european-providers.service';

describe('EuropeanProvidersService', () => {
  let service: EuropeanProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropeanProvidersService],
    }).compile();

    service = module.get<EuropeanProvidersService>(EuropeanProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StoreChainService } from './store-chain.service';

describe('StoreChainService', () => {
  let service: StoreChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreChainService],
    }).compile();

    service = module.get<StoreChainService>(StoreChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

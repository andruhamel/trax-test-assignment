import { Test, TestingModule } from '@nestjs/testing';
import { StoreChainController } from './store-chain.controller';

describe('StoreChainController', () => {
  let controller: StoreChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreChainController],
    }).compile();

    controller = module.get<StoreChainController>(StoreChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

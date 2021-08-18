import { Module } from '@nestjs/common';
import { StoreChainService } from './store-chain.service';
import { StoreChainController } from './store-chain.controller';

@Module({
  controllers: [StoreChainController],
  providers: [StoreChainService],
})
export class StoreChainModule {}

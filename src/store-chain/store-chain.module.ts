import { Module } from '@nestjs/common';
import { StoreChainService } from './store-chain.service';
import { StoreChainController } from './store-chain.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [StoreChainController],
  providers: [StoreChainService],
})
export class StoreChainModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreChainModule } from './store-chain/store-chain.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { MlModelModule } from './mlmodel/ml-model.module';

@Module({
  imports: [StoreChainModule, DatabaseModule, CategoryModule, MlModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

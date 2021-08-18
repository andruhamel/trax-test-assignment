import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreChainModule } from './store-chain/store-chain.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [StoreChainModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

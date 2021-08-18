import { Module } from '@nestjs/common';
import { MlModelController } from './ml-model.controller';
import { MlModelService } from './ml-model.service';

@Module({
  controllers: [MlModelController],
  providers: [MlModelService]
})
export class MlModelModule {}

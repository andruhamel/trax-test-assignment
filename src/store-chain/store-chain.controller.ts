import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { StoreChainService } from './store-chain.service';
import { PrismaExceptionFilter } from '../exception-filters/prisma-exception.filter';

@Controller('store-chain')
@UseFilters(PrismaExceptionFilter)
export class StoreChainController {
  constructor(private storeChainService: StoreChainService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.storeChainService.get(id);
  }

  @Get()
  getAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return this.storeChainService.getAll(take, skip);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.storeChainService.create(name);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
    return this.storeChainService.update(id, name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.storeChainService.delete(id);
  }
}

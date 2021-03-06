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
import { CategoryService } from '../category/category.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('store-chain')
@UseFilters(PrismaExceptionFilter)
export class StoreChainController {
  constructor(
    private storeChainService: StoreChainService,
    private categoryService: CategoryService,
  ) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.storeChainService.get(id);
  }

  @Get(':id/category')
  getCategories(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getByStore(id);
  }

  @Get()
  getAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return this.storeChainService.getAll(take, skip);
  }

  @Post()
  @ApiBody({
    type: 'object',
    schema: { properties: { name: { type: 'string' } } },
  })
  create(@Body('name') name: string) {
    return this.storeChainService.create(name);
  }

  @Put(':id')
  @ApiBody({
    type: 'object',
    schema: { properties: { name: { type: 'string' } } },
  })
  update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
    return this.storeChainService.update(id, name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.storeChainService.delete(id);
  }
}

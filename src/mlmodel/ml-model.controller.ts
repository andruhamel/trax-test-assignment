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
import { PrismaExceptionFilter } from '../exception-filters/prisma-exception.filter';
import { MlModelService } from './ml-model.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('ml-model')
@UseFilters(PrismaExceptionFilter)
export class MlModelController {
  constructor(private mlModelService: MlModelService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.mlModelService.get(id);
  }

  @Get()
  getAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return this.mlModelService.getAll(take, skip);
  }

  @Post()
  @ApiBody({
    type: 'object',
    schema: {
      properties: { categoryId: { type: 'integer' }, url: { type: 'string' } },
    },
  })
  create(
    @Body('categoryId', ParseIntPipe) categoryId: number,
    @Body('url') url: string,
  ) {
    return this.mlModelService.create(categoryId, url);
  }

  @Put(':id')
  @ApiBody({
    type: 'object',
    schema: {
      properties: { url: { type: 'string' } },
    },
  })
  update(@Param('id', ParseIntPipe) id: number, @Body('url') url: string) {
    return this.mlModelService.update(id, url);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.mlModelService.delete(id);
  }

  @Put(':id/linkToCategory/:categoryId')
  linkToCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.mlModelService.linkToCategory(id, categoryId);
  }
}

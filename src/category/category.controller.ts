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
import { CategoryService } from './category.service';

@Controller('category')
@UseFilters(PrismaExceptionFilter)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.get(id);
  }

  @Get()
  getAll(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return this.categoryService.getAll(take, skip);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
    return this.categoryService.update(id, name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}

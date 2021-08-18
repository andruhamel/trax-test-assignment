import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaClient) {}

  async get(id: number): Promise<Category> {
    const category = await this.db.category.findFirst({ where: { id } });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  getAll(take: number, skip: number): Promise<Array<Category>> {
    return this.db.category.findMany({ take, skip });
  }

  create(name: string): Promise<Category> {
    return this.db.category.create({ data: { name } });
  }

  update(id: number, name: string): Promise<Category> {
    return this.db.category.update({ where: { id }, data: { name } });
  }

  delete(id: number): Promise<Category> {
    return this.db.category.delete({ where: { id } });
  }
}

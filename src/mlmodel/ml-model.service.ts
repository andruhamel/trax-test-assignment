import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, MlModel } from '@prisma/client';

@Injectable()
export class MlModelService {
  constructor(private db: PrismaClient) {}

  async get(id: number): Promise<MlModel> {
    const model = await this.db.mlModel.findFirst({
      where: { id },
      include: { category: true },
    });

    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  getAll(take: number, skip: number): Promise<Array<MlModel>> {
    return this.db.mlModel.findMany({ take, skip });
  }

  create(categoryId: number, url: string): Promise<MlModel> {
    return this.db.mlModel.create({ data: { categoryId, url } });
  }

  update(id: number, url: string): Promise<MlModel> {
    return this.db.mlModel.update({ where: { id }, data: { url } });
  }

  delete(id: number): Promise<MlModel> {
    return this.db.mlModel.delete({ where: { id } });
  }

  linkToCategory(id: number, categoryId: number): Promise<MlModel> {
    return this.db.mlModel.update({ where: { id }, data: { categoryId } });
  }
}

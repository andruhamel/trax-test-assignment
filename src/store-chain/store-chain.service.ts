import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, StoreChain } from '@prisma/client';

@Injectable()
export class StoreChainService {
  constructor(private db: PrismaClient) {}

  async get(id: number): Promise<StoreChain> {
    const store = await this.db.storeChain.findFirst({ where: { id } });

    if (!store) {
      throw new NotFoundException();
    }

    return store;
  }

  getAll(take: number, skip: number): Promise<Array<StoreChain>> {
    return this.db.storeChain.findMany({ take, skip });
  }

  create(name: string): Promise<StoreChain> {
    return this.db.storeChain.create({ data: { name } });
  }

  update(id: number, name: string): Promise<StoreChain> {
    return this.db.storeChain.update({ where: { id }, data: { name } });
  }

  delete(id: number): Promise<StoreChain> {
    return this.db.storeChain.delete({ where: { id } });
  }
}

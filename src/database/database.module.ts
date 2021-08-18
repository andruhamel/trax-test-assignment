import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prismaProvider = { provide: PrismaClient, useClass: PrismaClient };

@Global()
@Module({
  providers: [prismaProvider],
  exports: [prismaProvider],
})
export class DatabaseModule {}

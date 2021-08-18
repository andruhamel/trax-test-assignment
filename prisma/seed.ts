import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  // create store
  const storeAuchan = await prisma.storeChain.create({
    data: {
      name: 'Auchan',
    },
  });

  // create categories
  const [categoryBiscuits, categoryDeodorants] = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Biscuits',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Deodorants',
      },
    }),
  ]);

  // link store and categories
  await prisma.storeChainCategoryLink.createMany({
    data: [
      { storeChainId: storeAuchan.id, categoryId: categoryBiscuits.id },
      { storeChainId: storeAuchan.id, categoryId: categoryDeodorants.id },
    ],
  });

  // create MLModels for categories
  await prisma.mLModel.createMany({
    data: [
      {
        categoryId: categoryBiscuits.id,
        url: 'http://localhost:8080/model/biscuits-1',
      },
      {
        categoryId: categoryBiscuits.id,
        url: 'http://localhost:8080/model/biscuits-2',
      },
      {
        categoryId: categoryDeodorants.id,
        url: 'http://localhost:8080/model/deodorants-1',
      },
    ],
  });
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

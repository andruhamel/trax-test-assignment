-- CreateTable
CREATE TABLE "StoreChain" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MlModel" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreChainCategoryLink" (
    "id" SERIAL NOT NULL,
    "storeChainId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreChain.name_unique" ON "StoreChain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MlModel.url_unique" ON "MlModel"("url");

-- CreateIndex
CREATE UNIQUE INDEX "StoreChainCategoryLink.storeChainId_categoryId_unique" ON "StoreChainCategoryLink"("storeChainId", "categoryId");

-- AddForeignKey
ALTER TABLE "MlModel" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreChainCategoryLink" ADD FOREIGN KEY ("storeChainId") REFERENCES "StoreChain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreChainCategoryLink" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

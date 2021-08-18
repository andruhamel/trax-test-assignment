/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `MLModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `StoreChain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MLModel.url_unique" ON "MLModel"("url");

-- CreateIndex
CREATE UNIQUE INDEX "StoreChain.name_unique" ON "StoreChain"("name");

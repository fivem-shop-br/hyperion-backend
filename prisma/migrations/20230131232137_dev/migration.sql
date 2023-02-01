/*
  Warnings:

  - You are about to drop the column `shop_id` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_shop_id_shop_slug_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_category_id_category_name_fkey";

-- DropIndex
DROP INDEX "Categories_id_name_key";

-- DropIndex
DROP INDEX "Shop_id_slug_key";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "shop_id";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category_name";

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_shop_slug_fkey" FOREIGN KEY ("shop_slug") REFERENCES "Shop"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

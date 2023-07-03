/*
  Warnings:

  - You are about to drop the column `shop_slug` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `max_categories` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `max_coupons` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `max_products` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Products` table. All the data in the column will be lost.
  - The `image` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `plan_type` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `primary_color` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_color` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `_UserInShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shopSlug` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCategories` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCoupons` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxProducts` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxUsers` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planType` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserInShopRoles" AS ENUM ('owner', 'createProduct', 'updateProduct', 'deleteProduct', 'createCategory', 'updateCategory', 'deleteCategory');

-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_shop_slug_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_plan_type_fkey";

-- DropForeignKey
ALTER TABLE "_UserInShop" DROP CONSTRAINT "_UserInShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInShop" DROP CONSTRAINT "_UserInShop_B_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "shop_slug",
ADD COLUMN     "shopSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "max_categories",
DROP COLUMN "max_coupons",
DROP COLUMN "max_products",
ADD COLUMN     "maxCategories" INTEGER NOT NULL,
ADD COLUMN     "maxCoupons" INTEGER NOT NULL,
ADD COLUMN     "maxProducts" INTEGER NOT NULL,
ADD COLUMN     "maxUsers" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" TEXT NOT NULL,
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "plan_type",
DROP COLUMN "primary_color",
DROP COLUMN "secondary_color",
ADD COLUMN     "accessToken" TEXT DEFAULT '',
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "planType" "planTypes" NOT NULL,
ADD COLUMN     "primaryColor" TEXT,
ADD COLUMN     "secondaryColor" TEXT,
ALTER COLUMN "domain" DROP NOT NULL;

-- DropTable
DROP TABLE "_UserInShop";

-- CreateTable
CREATE TABLE "UserInShop" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "role" "UserInShopRoles"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInShop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_planType_fkey" FOREIGN KEY ("planType") REFERENCES "Plan"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInShop" ADD CONSTRAINT "UserInShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInShop" ADD CONSTRAINT "UserInShop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_shopSlug_fkey" FOREIGN KEY ("shopSlug") REFERENCES "Shop"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

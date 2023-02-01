/*
  Warnings:

  - Added the required column `max_categories` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_coupons` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_products` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "max_categories" INTEGER NOT NULL,
ADD COLUMN     "max_coupons" INTEGER NOT NULL,
ADD COLUMN     "max_products" INTEGER NOT NULL;

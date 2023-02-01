/*
  Warnings:

  - You are about to drop the column `plan` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `plan_type` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "planTypes" AS ENUM ('free', 'premium', 'ultra', 'super');

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "plan",
ADD COLUMN     "plan_type" "planTypes" NOT NULL;

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "type" "planTypes" NOT NULL DEFAULT 'free',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_type_key" ON "Plan"("type");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_plan_type_fkey" FOREIGN KEY ("plan_type") REFERENCES "Plan"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `notes` on the `barbershops` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "notes" SET DATA TYPE DECIMAL(65,30);

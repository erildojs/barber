/*
  Warnings:

  - You are about to alter the column `notes` on the `barbershops` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `notes` on table `barbershops` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "notes" DROP DEFAULT,
ALTER COLUMN "notes" SET DATA TYPE DOUBLE PRECISION;

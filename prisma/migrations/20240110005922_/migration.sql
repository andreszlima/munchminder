/*
  Warnings:

  - Made the column `newPrice` on table `ListItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "newPrice" SET NOT NULL;

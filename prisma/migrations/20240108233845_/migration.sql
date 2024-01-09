/*
  Warnings:

  - Made the column `imageLink` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "imageLink" SET NOT NULL,
ALTER COLUMN "imageLink" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

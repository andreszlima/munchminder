-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "split" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "province" TEXT NOT NULL DEFAULT 'Ontario';

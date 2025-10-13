-- DropForeignKey
ALTER TABLE "public"."BillItem" DROP CONSTRAINT "BillItem_productId_fkey";

-- AlterTable
ALTER TABLE "BillItem" ADD COLUMN     "productName" TEXT,
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

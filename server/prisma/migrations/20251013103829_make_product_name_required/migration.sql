/*
  Warnings:

  - Made the column `productName` on table `BillItem` required. This step will fail if there are existing NULL values in that column.

*/

-- First, update existing NULL values by getting the product name from the Product table
UPDATE "BillItem" 
SET "productName" = (
  SELECT name 
  FROM "Product" 
  WHERE "Product".id = "BillItem"."productId"
)
WHERE "productName" IS NULL AND "productId" IS NOT NULL;

-- For any remaining NULL values (custom products without names), set a default
UPDATE "BillItem" 
SET "productName" = 'Custom Product'
WHERE "productName" IS NULL;

-- AlterTable
ALTER TABLE "BillItem" ALTER COLUMN "productName" SET NOT NULL;

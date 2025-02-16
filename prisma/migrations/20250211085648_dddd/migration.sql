/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `deletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Mark` ADD COLUMN `highlight` VARCHAR(191) NOT NULL DEFAULT 'bg-pink-200';

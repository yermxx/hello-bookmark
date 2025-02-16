/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `book_ibfk_1`;

-- AlterTable
ALTER TABLE `Book` MODIFY `deletedAt` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

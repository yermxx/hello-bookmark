/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_userId_fkey`;

-- AlterTable
ALTER TABLE `Book` MODIFY `deletedAt` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `fk_Book_owner_User` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `Book` RENAME INDEX `Book_userId_idx` TO `fk_Book_owner_User`;

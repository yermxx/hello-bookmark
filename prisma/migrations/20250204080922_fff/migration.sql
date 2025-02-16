/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `descript` on the `Mark` table. All the data in the column will be lost.
  - Added the required column `description` to the `Mark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `deletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Mark` DROP COLUMN `descript`,
    ADD COLUMN `description` VARCHAR(1000) NOT NULL;

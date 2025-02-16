-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `deletedAt` TIMESTAMP NULL,
    `userId` BIGINT UNSIGNED NOT NULL,

    INDEX `fk_Book_owner_User`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mark` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER UNSIGNED NOT NULL,
    `url` VARCHAR(1024) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `descript` VARCHAR(1000) NOT NULL,

    INDEX `fk_Mark_book`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(31) NOT NULL,
    `authType` VARCHAR(255) NOT NULL DEFAULT 'credentials',
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(128) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mark` ADD CONSTRAINT `mark_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
